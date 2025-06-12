import { supabase } from './supabase';
import { usePrivy } from '@privy-io/react-auth';

export async function testSupabaseConnection() {
  const results = {
    success: true,
    message: 'All tests passed successfully',
    details: {
      connection: false,
      tableStructure: false,
      writePermission: false,
      deletePermission: false,
      actualColumns: [] as string[],
      missingColumns: [] as string[],
      debug: {
        tableExists: false,
        rowCount: 0,
        error: null as string | null,
        authStatus: null as string | null,
        walletAddress: null as string | null,
      },
    },
  };

  try {
    // Check authentication status
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    results.details.debug.authStatus = session ? 'authenticated' : 'not authenticated';
    results.details.debug.walletAddress = session?.user?.user_metadata?.wallet_address || null;

    if (authError) {
      throw new Error(`Authentication check failed: ${authError.message}`);
    }

    if (!session) {
      throw new Error('Not authenticated. Please connect your wallet first.');
    }

    // Test 1: Basic Connection and Table Existence
    const { count, error: countError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new Error(`Connection test failed: ${countError.message}`);
    }

    results.details.debug.tableExists = true;
    results.details.debug.rowCount = count || 0;
    results.details.connection = true;

    // Test 2: Table Structure
    // Try to insert a test row to check structure
    const testPost = {
      title: 'Test Post',
      slug: `test-post-${Date.now()}`,
      excerpt: 'This is a test post',
      content: 'Test content',
      published: false,
      author_id: session.user.id,
      image_url: null,
      tags: [],
      published_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: structureData, error: structureError } = await supabase
      .from('posts')
      .insert([testPost])
      .select()
      .single();

    if (structureError) {
      // If we get a column error, it means the table exists but structure is wrong
      if (structureError.message.includes('column') || structureError.message.includes('field')) {
        throw new Error(`Table structure error: ${structureError.message}`);
      }
      // Otherwise, it might be a permission error
      throw new Error(
        `Failed to check table structure: ${structureError.message}\n` +
        `Auth status: ${results.details.debug.authStatus}\n` +
        `Wallet address: ${results.details.debug.walletAddress}`
      );
    }

    if (!structureData) {
      throw new Error('No data returned after insert');
    }

    // Get actual columns from the returned data
    results.details.actualColumns = Object.keys(structureData);

    // Verify required columns exist
    const requiredColumns = [
      'id',
      'title',
      'slug',
      'excerpt',
      'content',
      'published',
      'created_at',
      'updated_at',
      'author_id',
      'image_url',
      'tags',
      'published_at'
    ];

    const missingColumns = requiredColumns.filter(col => !results.details.actualColumns.includes(col));
    results.details.missingColumns = missingColumns;

    if (missingColumns.length > 0) {
      throw new Error(
        `Missing required columns: ${missingColumns.join(', ')}\n` +
        `Actual columns found: ${results.details.actualColumns.join(', ')}\n` +
        `Table exists: ${results.details.debug.tableExists}\n` +
        `Row count: ${results.details.debug.rowCount}\n` +
        `Auth status: ${results.details.debug.authStatus}\n` +
        `Wallet address: ${results.details.debug.walletAddress}`
      );
    }

    results.details.tableStructure = true;
    results.details.writePermission = true;

    // Test 3: Delete Permission
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', structureData.id);

    if (deleteError) {
      throw new Error(
        `Delete permission test failed: ${deleteError.message}\n` +
        `Auth status: ${results.details.debug.authStatus}\n` +
        `Wallet address: ${results.details.debug.walletAddress}`
      );
    }

    results.details.deletePermission = true;

    return results;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      details: results.details,
    };
  }
} 
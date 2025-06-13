'use client';

import { useState } from 'react';

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [envVars, setEnvVars] = useState({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 10)}...`
      : 'Not set',
  });
  const supabase = useSupabaseWithPrivy();

  const runTests = async () => {
    setIsTesting(true);
    try {
      if (!supabase) throw new Error('Supabase client not ready. Connect your wallet.');
      // Inline the test logic here using the authenticated supabase client
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) throw new Error(`Authentication check failed: ${authError.message}`);
      if (!session) throw new Error('Not authenticated. Please connect your wallet first.');
      // Test 1: Basic Connection
      const { count, error: countError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });
      if (countError) throw new Error(`Connection test failed: ${countError.message}`);
      // Test 2: Table Structure & Write
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
      if (structureError) throw new Error(`Write test failed: ${structureError.message}`);
      // Test 3: Delete
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', structureData.id);
      if (deleteError) throw new Error(`Delete test failed: ${deleteError.message}`);
      setTestResults({
        success: true,
        message: 'All Supabase tests passed successfully',
        details: { post: structureData },
      });
    } catch (error: any) {
      setTestResults({
        success: false,
        message: error.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const testPostCreation = async () => {
    setIsTesting(true);
    try {
      if (!supabase) throw new Error('Supabase client not ready. Connect your wallet.');
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) throw new Error(`Authentication check failed: ${authError.message}`);
      if (!session) throw new Error('Not authenticated. Please connect your wallet first.');
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
      const { data, error } = await supabase
        .from('posts')
        .insert([testPost])
        .select()
        .single();
      if (error) throw error;
      // Clean up the test post
      await supabase.from('posts').delete().eq('id', data.id);
      setTestResults({
        success: true,
        message: 'Test post created and deleted successfully',
        details: { post: data },
      });
    } catch (error: any) {
      setTestResults({
        success: false,
        message: error.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Development Test Page</h1>

      {/* Environment Variables */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="space-y-2">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {key}:
              </span>
              <span className="ml-2 text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
        <div className="space-x-4">
          <button
            onClick={runTests}
            disabled={isTesting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isTesting ? 'Running Tests...' : 'Test Supabase Connection'}
          </button>
          <button
            onClick={testPostCreation}
            disabled={isTesting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isTesting ? 'Testing...' : 'Test Post Creation'}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className={`p-4 rounded ${testResults.success ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-semibold mb-2">
              {testResults.success ? '✅ Tests Passed' : '❌ Tests Failed'}
            </p>
            <p className="mb-4">{testResults.message}</p>
            {testResults.details && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Details:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
                  {JSON.stringify(testResults.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
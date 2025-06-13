'use client';

import { useState, useEffect } from 'react';
import { useSupabaseWithJwt } from '../../lib/useSupabaseWithJwt';

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [envVars, setEnvVars] = useState({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 10)}...`
      : 'Not set',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const supabase = useSupabaseWithJwt(token);

  const runTests = async () => {
    setIsTesting(true);
    try {
      if (!supabase) throw new Error('Supabase client not ready. Connect your wallet.');
      // Test 1: Basic Connection
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*');
      if (postsError) throw new Error(`Connection test failed: ${postsError.message}`);
      // Test 2: Table Structure & Write
      const testPost = {
        title: 'Test Post',
        slug: `test-post-${Date.now()}`,
        excerpt: 'This is a test post',
        content: 'Test content',
        published: false,
        author_id: posts[0]?.author_id || 'test-author',
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Development Test Page</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-gray-700 dark:text-gray-300">Please connect your wallet and authenticate to run Supabase tests.</p>
        </div>
      </div>
    );
  }

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
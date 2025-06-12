'use client';

import { useState, useEffect } from 'react';
import type { Post } from '@/lib/supabase';

interface SearchPreviewProps {
  post: Post;
  baseUrl?: string;
}

export function SearchPreview({ post, baseUrl = 'https://dobprotocol.com' }: SearchPreviewProps) {
  const [titleLength, setTitleLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const url = `${baseUrl}/blog/${post.slug}`;

  useEffect(() => {
    setTitleLength(title.length);
    setDescriptionLength(description.length);
  }, [title, description]);

  const getTitleColor = () => {
    if (titleLength > 60) return 'text-red-500';
    if (titleLength > 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getDescriptionColor = () => {
    if (descriptionLength > 160) return 'text-red-500';
    if (descriptionLength > 140) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Search Engine Preview</h3>
      
      <div className="border-l-4 border-blue-500 pl-4 mb-4">
        <div className="text-sm text-gray-500 mb-1">Google Search Result Preview</div>
        
        {/* Title */}
        <div className="mb-1">
          <a href={url} className="text-blue-800 hover:underline text-xl">
            {title}
          </a>
          <div className="text-xs mt-1">
            Length: <span className={getTitleColor()}>{titleLength}</span> characters
            {titleLength > 60 && (
              <span className="text-red-500 ml-2">
                (Warning: Title is too long for optimal display)
              </span>
            )}
          </div>
        </div>

        {/* URL */}
        <div className="text-green-800 text-sm mb-1">
          {url}
        </div>

        {/* Description */}
        <div className="text-gray-600 text-sm">
          {description}
          <div className="text-xs mt-1">
            Length: <span className={getDescriptionColor()}>{descriptionLength}</span> characters
            {descriptionLength > 160 && (
              <span className="text-red-500 ml-2">
                (Warning: Description is too long and may be truncated)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="mt-4 text-sm">
        <h4 className="font-semibold mb-2">SEO Recommendations:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Title should be between 50-60 characters</li>
          <li>Description should be between 140-160 characters</li>
          <li>Include relevant keywords in both title and description</li>
          <li>Make sure the URL is clean and readable</li>
          <li>Ensure content matches the title and description</li>
        </ul>
      </div>

      {/* Keywords Preview */}
      {post.seo_keywords && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Keywords:</h4>
          <div className="flex flex-wrap gap-2">
            {post.seo_keywords.split(',').map((keyword, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
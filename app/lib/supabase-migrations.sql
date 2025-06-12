-- Create posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);

-- Create index on published status for faster filtering
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts(published);

-- Add RLS (Row Level Security) policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read published posts
CREATE POLICY "Allow public read access to published posts"
    ON posts FOR SELECT
    USING (published = true);

-- Create policy to allow authenticated users to read all posts
CREATE POLICY "Allow authenticated users to read all posts"
    ON posts FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts"
    ON posts FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create policy to allow authenticated users to update their own posts
CREATE POLICY "Allow authenticated users to update posts"
    ON posts FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy to allow authenticated users to delete posts
CREATE POLICY "Allow authenticated users to delete posts"
    ON posts FOR DELETE
    TO authenticated
    USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
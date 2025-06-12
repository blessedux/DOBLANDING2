-- Drop the table if it exists
DROP TABLE IF EXISTS posts;

-- Create posts table
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    author_id UUID NOT NULL,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}'::text[]
);

-- Create indexes
CREATE INDEX posts_slug_idx ON posts(slug);
CREATE INDEX posts_published_idx ON posts(published);
CREATE INDEX posts_author_id_idx ON posts(author_id);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Published posts are viewable by everyone"
    ON posts FOR SELECT
    USING (published = true);

CREATE POLICY "Admins and editors can create posts"
    ON posts FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = ANY (ARRAY['ADMIN'::text, 'EDITOR'::text])
    ));

CREATE POLICY "Admins and editors can update their own posts"
    ON posts FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = ANY (ARRAY['ADMIN'::text, 'EDITOR'::text])
        AND users.id = posts.author_id
    ));

CREATE POLICY "Admins and editors can delete their own posts"
    ON posts FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = ANY (ARRAY['ADMIN'::text, 'EDITOR'::text])
        AND users.id = posts.author_id
    ));

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
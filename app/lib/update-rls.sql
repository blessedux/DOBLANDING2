-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Admins and editors can create posts" ON posts;
DROP POLICY IF EXISTS "Admins and editors can update their own posts" ON posts;
DROP POLICY IF EXISTS "Admins and editors can delete their own posts" ON posts;
DROP POLICY IF EXISTS "Allow public read access to published posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to read all posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to update posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to delete posts" ON posts;
DROP POLICY IF EXISTS "Allow all operations for testing" ON posts;

-- Create new policies for wallet-based auth
CREATE POLICY "Allow read access for all users"
    ON posts FOR SELECT
    USING (true);

CREATE POLICY "Allow insert for authenticated users"
    ON posts FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND
        auth.uid() = author_id
    );

CREATE POLICY "Allow update for post authors"
    ON posts FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        auth.uid() = author_id
    );

CREATE POLICY "Allow delete for post authors"
    ON posts FOR DELETE
    USING (
        auth.role() = 'authenticated' AND
        auth.uid() = author_id
    );

-- Grant necessary permissions
GRANT ALL ON posts TO authenticated;
GRANT ALL ON posts TO anon;
GRANT ALL ON posts TO service_role; 
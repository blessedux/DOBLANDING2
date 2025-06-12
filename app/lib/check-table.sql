-- Check if the table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = 'posts'
);

-- Get table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'posts'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT *
FROM pg_policies
WHERE tablename = 'posts';

-- Check indexes
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'posts'; 
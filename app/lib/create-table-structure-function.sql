-- Create a function to get table structure
CREATE OR REPLACE FUNCTION get_table_structure(p_table_name text)
RETURNS TABLE (
    column_name text,
    data_type text,
    is_nullable text,
    column_default text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.column_name::text,
        c.data_type::text,
        c.is_nullable::text,
        c.column_default::text
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
    AND c.table_name = p_table_name
    ORDER BY c.ordinal_position;
END;
$$; 
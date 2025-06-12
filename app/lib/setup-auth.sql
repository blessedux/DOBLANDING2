-- Create a test user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'test@example.com'
    ) THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'test@example.com',
            crypt('testpassword123', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );
    END IF;
END
$$;

-- Create a test role if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM auth.roles WHERE name = 'test_role'
    ) THEN
        INSERT INTO auth.roles (name) VALUES ('test_role');
    END IF;
END
$$;

-- Grant test role to test user
DO $$
DECLARE
    test_user_id uuid;
BEGIN
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test@example.com';
    IF test_user_id IS NOT NULL THEN
        INSERT INTO auth.user_roles (user_id, role_id)
        SELECT test_user_id, id FROM auth.roles WHERE name = 'test_role'
        ON CONFLICT (user_id, role_id) DO NOTHING;
    END IF;
END
$$; 
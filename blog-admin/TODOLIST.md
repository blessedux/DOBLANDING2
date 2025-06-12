# DOB Protocol Blog Implementation Todo List

## 1. Initial Setup

- [ ] Clean up Prisma files

  - [x] Delete `/prisma` directory
  - [x] Delete `/generated/prisma` directory
  - [x] Remove Prisma dependencies from package.json

  ```bash
  npm uninstall @prisma/client prisma
  ```

- [x] Install required dependencies

  ```bash
  npm install @supabase/supabase-js @privy-io/react-auth @tanstack/react-query
  ```

- [z] Set up Supabase

  1. Create a new project at https://supabase.com
  2. Get your project URL and anon key from Project Settings > API
  3. Create the following tables in the SQL editor:

  ```sql
  -- Create users table
  create table users (
    id uuid default uuid_generate_v4() primary key,
    wallet_address text unique not null,
    role text check (role in ('ADMIN', 'EDITOR', 'READER')) default 'READER',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create posts table
  create table posts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    content text not null,
    excerpt text,
    published boolean default false,
    published_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    author_id uuid references users(id) not null,
    image_url text,
    tags text[] default '{}'
  );

  -- Create RLS policies
  alter table users enable row level security;
  alter table posts enable row level security;

  -- Users can read all users
  create policy "Users are viewable by everyone" on users
    for select using (true);

  -- Users can only update their own role if they're an admin
  create policy "Users can update their own role if admin" on users
    for update using (auth.uid() = id and role = 'ADMIN');

  -- Posts are viewable by everyone if published
  create policy "Published posts are viewable by everyone" on posts
    for select using (published = true);

  -- Only admins and editors can create posts
  create policy "Admins and editors can create posts" on posts
    for insert with check (
      exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role in ('ADMIN', 'EDITOR')
      )
    );

  -- Only admins and editors can update their own posts
  create policy "Admins and editors can update their own posts" on posts
    for update using (
      exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role in ('ADMIN', 'EDITOR')
        and users.id = author_id
      )
    );
  ```

  4. Set up storage bucket for blog images:

  ```sql
  -- Create a new storage bucket for blog images
  insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);

  -- Allow public access to blog images
  create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );
  ```

- [x] Set up environment variables in `.env.local`

  ```
  # Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL=your_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

  # Privy Configuration
  NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
  ```

- [x] Configure Privy project and get App ID
  1. Go to https://console.privy.io/
  2. Create a new project
  3. Get your App ID
  4. Configure allowed domains (localhost for development)

## 2. Authentication & Authorization

- [ ] Implement Privy authentication provider
- [ ] Create protected routes middleware
- [ ] Set up wallet whitelist for admin/editor roles
- [ ] Create login/logout functionality
- [ ] Implement role-based access control

## 3. Database & API

- [ ] Set up Supabase tables:
  - [ ] users
  - [ ] posts
- [ ] Configure Row Level Security (RLS) policies
- [ ] Create API endpoints:
  - [ ] GET /api/posts (public)
  - [ ] GET /api/posts/[slug] (public)
  - [ ] POST /api/posts (admin/editor)
  - [ ] PUT /api/posts/[id] (admin/editor)
  - [ ] DELETE /api/posts/[id] (admin only)

## 4. Blog Frontend

- [ ] Create blog listing page (`/blog`)
  - [ ] Implement post grid/list view
  - [ ] Add pagination
  - [ ] Add search functionality
  - [ ] Add category/tag filtering
- [ ] Create individual post page (`/blog/[slug]`)
  - [ ] Implement post content display
  - [ ] Add social sharing
  - [ ] Add related posts
- [ ] Add loading states and error handling

## 5. Admin CMS

- [ ] Create admin dashboard (`/admin`)
  - [ ] Add authentication check
  - [ ] Show admin/editor controls
- [ ] Create post editor
  - [ ] Rich text editor integration
  - [ ] Image upload functionality
  - [ ] Draft/publish functionality
  - [ ] Tag management
- [ ] Create post management interface
  - [ ] List all posts
  - [ ] Edit/delete functionality
  - [ ] Post status management

## 6. Content Management

- [ ] Implement image upload to Supabase storage
- [ ] Add markdown/rich text support
- [ ] Create post preview functionality
- [ ] Add post scheduling
- [ ] Implement post categories/tags

## 7. User Experience

- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add toast notifications
- [ ] Create responsive design
- [ ] Add dark/light mode support

## 8. Testing & Deployment

- [ ] Test authentication flows
- [ ] Test CRUD operations
- [ ] Test responsive design
- [ ] Set up deployment pipeline
- [ ] Configure production environment variables

## 9. SEO & Performance

- [ ] Add meta tags
- [ ] Implement OpenGraph tags
- [ ] Add sitemap
- [ ] Configure robots.txt
- [ ] Optimize images
- [ ] Add analytics

## 10. Documentation

- [ ] Create admin user guide
- [ ] Document API endpoints
- [ ] Add setup instructions
- [ ] Create maintenance guide

## Current Focus

1. Complete initial setup with Supabase and Privy
2. Implement basic authentication
3. Create blog listing and individual post pages
4. Build admin CMS for post creation/editing

## Next Steps

1. Set up Supabase project and create tables
2. Configure Privy authentication
3. Create basic blog pages
4. Implement admin dashboard

## Notes

- Keep the design consistent with DOB Protocol's branding
- Ensure mobile responsiveness
- Implement proper error handling
- Add loading states for better UX
- Consider adding analytics for post views

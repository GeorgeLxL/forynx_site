-- Admin users
create table admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Contact form submissions
create table contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  subject text not null,
  content text,
  starred boolean default false,
  created_at timestamptz default now()
);

-- Email templates
create table templates (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  content text not null,
  created_at timestamptz default now()
);

-- Disable RLS (service role key bypasses anyway, but explicit is better)
alter table admin_users enable row level security;
alter table contacts enable row level security;
alter table templates enable row level security;

-- Allow service role full access (your backend uses service role key)
create policy "service role full access" on admin_users for all using (true);
create policy "service role full access" on contacts for all using (true);
create policy "service role full access" on templates for all using (true);

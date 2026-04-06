create table push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text unique not null,
  subscription text not null,
  created_at timestamptz default now()
);

alter table push_subscriptions enable row level security;
create policy "service role full access" on push_subscriptions for all using (true);

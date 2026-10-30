create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.planos (
  id bigint generated always as identity primary key,
  nome text not null,
  credito numeric(14,2) not null check (credito > 0),
  mensalidade numeric(14,2) not null check (mensalidade > 0),
  parcelas integer not null check (parcelas between 1 and 600),
  correcao_anual numeric(6,3) not null default 6 check (correcao_anual between 0 and 100),
  lance_percentual numeric(6,3) not null default 30 check (lance_percentual between 0 and 100),
  venda_percentual numeric(6,3) not null default 30 check (venda_percentual between 0 and 100),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create index if not exists planos_ativo_idx on public.planos(ativo);
alter table public.admin_users enable row level security;
alter table public.planos enable row level security;

create policy "admin pode ver proprio cadastro" on public.admin_users
for select to authenticated using (user_id = (select auth.uid()));

create policy "publico ve planos ativos e admin ve todos" on public.planos
for select to anon, authenticated using (
  ativo = true or exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
);
create policy "admin insere planos" on public.planos
for insert to authenticated with check (
  exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
);
create policy "admin atualiza planos" on public.planos
for update to authenticated using (
  exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
) with check (
  exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
);
create policy "admin exclui planos" on public.planos
for delete to authenticated using (
  exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
);

-- Depois de criar o usuário em Authentication > Users, execute manualmente:
-- insert into public.admin_users(user_id) values ('COLE-AQUI-O-UUID-DO-SEU-USUARIO');
-- Não exponha service_role ou secret keys no HTML.

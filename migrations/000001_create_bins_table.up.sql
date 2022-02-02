CREATE TABLE IF NOT EXISTS bins (
  id serial PRIMARY KEY,
  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
  url text UNIQUE NOT NULL,
  creator_ip text
);

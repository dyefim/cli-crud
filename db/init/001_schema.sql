CREATE TABLE IF NOT EXISTS list (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  done       BOOLEAN NOT NULL DEFAULT false,
  tags       TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
˛
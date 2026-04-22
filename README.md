# todo

CLI todo app backed by Postgres.

## Setup

Requires Node.js and a running Postgres instance.

```sh
npm install
createdb todo
psql -d todo <<'SQL'
CREATE TABLE list (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  done       BOOLEAN NOT NULL DEFAULT false,
  tags       TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
SQL
```

Create `.env` in the project root:

```
PGHOST=localhost
PGPORT=5432
PGUSER=your_user
PGPASSWORD=your_password
PGDATABASE=todo
```

Install the CLI globally:

```sh
npm link
```

## Usage

```sh
todo --add "buy milk" --tags shop errands
todo --list                  # all
todo --list pending          # pending only
todo --list done             # completed only
todo --tag shop              # filter by tag
todo --done 1                # mark item 1 done
todo --del 1                 # delete item 1
todo --help
```

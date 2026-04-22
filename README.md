# todo

CLI todo app backed by Postgres (via Docker).

## Setup

Requires [Docker Desktop](https://docs.docker.com/get-docker/) and Node.js.

```sh
bash install.sh
```

Starts Docker if needed, launches Postgres, creates schema, installs deps, links the `todo` command globally. Container has `restart: unless-stopped`, so it auto-starts with Docker on future boots.

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

## Lifecycle

```sh
bash start.sh          # start DB (and Docker if stopped)
bash stop.sh           # stop DB, keep data
bash uninstall.sh      # unlink CLI, remove container + volume (wipes data)
```

Low-level equivalents:

```sh
docker compose start         # start
docker compose stop          # stop
docker compose logs -f db    # tail logs
docker compose down -v       # remove + wipe data
```

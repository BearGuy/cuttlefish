#!/bin/bash
psql -d cuttlefish -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
psql -d cuttlefish -c "grant usage on schema public to public; grant create on schema public to public;"
psql -d cuttlefish -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
#!/bin/sh

bash /usr/local/bin/docker-entrypoint.sh;

psql -d root -f /app/initdb.sql;

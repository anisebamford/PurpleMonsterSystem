#!/bin/sh

postgres;

psql -d root -f /app/initdb.sql;

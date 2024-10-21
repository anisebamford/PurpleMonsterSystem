CREATE TABLE IF NOT EXISTS events(
    id uuid PRIMARY KEY,
    sender uuid NOT NULL,
    timestamp timestamp NOT NULL,
    entity uuid NOT NULL,
    type text NOT NULL,
    event text NOT NULL
);

CREATE INDEX byEntity ON events (entity);
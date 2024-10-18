CREATE TABLE IF NOT EXISTS events (
    id UUID NOT NULL PRIMARY KEY,
    sender UUID NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    entity UUID NOT NULL,
    type TEXT NOT NULL,
    event TEXT NOT NULL,
);

CREATE INDEX IF NOT EXISTS entityEventIndex ON events (Entity);

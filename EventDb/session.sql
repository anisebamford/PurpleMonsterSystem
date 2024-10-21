
PREPARE insertEvent(UUID, UUID, TIMESTAMP, UUID, TEXT, TEXT) AS
    INSERT into events VALUES($1, $2, $3, $4, $5, $6);

PREPARE getEventsForEntity(UUID) AS
    SELECT event FROM byEntity WHERE entity = $1;

PREPARE getEventsForSender(UUID) AS
    SELECT event FROM events WHERE sender = $1;
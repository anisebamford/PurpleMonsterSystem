using System.Text.Json;
using PurpleMonsterEvents;

namespace PurpleMonsterSystem {
    class PersistentEventStorage {
        public string MakeInsertEventStatement<T>(T evt) where T : JsonEvent<object> {
            return $"EXECUTE insertEvent({evt.Id}, {evt.Sender}, {evt.Timestamp}, {evt.Entity}, {evt.Type}, {JsonSerializer.Serialize(evt)});";
        }

        public string MakeQueryEventsByEntityId(string entityId) {
            return $"EXECUTE getEventsByEntityId({entityId})";
        }
    }
}

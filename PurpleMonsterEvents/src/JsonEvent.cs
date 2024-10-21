using System.Text.Json;

namespace PurpleMonsterEvents {

    public class MalformedJsonEventException : Exception 
    {

    }

    public class JsonEvent<T> : EventArgs
    {
        public static JsonEvent<T> FromJson(string json) {
            JsonEvent<T>? evt = JsonSerializer.Deserialize<JsonEvent<T>>(json, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            if (evt == null) {
                throw new MalformedJsonEventException();
            }
            return evt;
        }

        public required string Id { get; set; }
        public required string Timestamp { get; set; }
        public required string Type { get; set; }
        public required string Sender { get; set; }
        public required T Body { get; set; }
        public required string Entity { get; set; }
    }
}

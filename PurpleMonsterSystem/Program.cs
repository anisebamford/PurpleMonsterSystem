// See https://aka.ms/new-console-template for more information
namespace PurpleMonsterSystem {
    class Program {
        public static void Main() {
            TestEventPublisher testEvent = new();
            Logger logger = new();
            testEvent.Tested += logger.onEvent;

            testEvent.Test(@"{
                ""id"": ""test-id"",  
                ""timestamp"": ""test-timestamp"",
                ""sender"": ""test-sender"",
                ""type"": ""test"",
                ""body"": {
                    ""message"": ""Hello World""
                }
            }");
        }
    }
}

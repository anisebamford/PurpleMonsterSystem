// See https://aka.ms/new-console-template for more information
namespace PurpleMonsterSystem {
    class Program {
        public static void Main() {
            TestEventPublisher testEvent = new();
            Logger logger = new();
            testEvent.Tested += logger.onEvent;

            testEvent.Test("Foo");
        }
    }
}

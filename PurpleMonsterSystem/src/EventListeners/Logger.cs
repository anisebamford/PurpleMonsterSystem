namespace PurpleMonsterSystem {
    class Logger {
        public void onEvent(object source, JsonEvent<TestEventBody> e) {
            Console.WriteLine(e.Body.ToString());
        }
    }
}

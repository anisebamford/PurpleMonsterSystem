namespace PurpleMonsterSystem {
    class TestEvent : EventArgs {
        public string Message = "";
        public override string ToString()
        {
            return Message;
        }
    }

    class TestEventPublisher {
        public delegate void TestEventHandler(object source, TestEvent e);

        public event TestEventHandler? Tested;

        public void Test(string message) {
            System.Console.WriteLine($"sending message {message}");
            OnTest(message);
        }

        protected virtual void OnTest(string message) {
            TestEvent evt = new() {Message = message};
            Tested?.Invoke(this, evt);
        }
    }
}

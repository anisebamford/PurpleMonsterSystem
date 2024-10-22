namespace PurpleMonsterEvents {
    public class TestEventBody
    {
        public required string Message { get; set; }

        public override string ToString()
        {
            return Message;
        }
    }
        
    public class TestEventPublisher {
        public delegate void TestEventHandler(object source, JsonEvent<TestEventBody> e);

        public const TYPE="test";

        public event TestEventHandler? Tested;

        public void Test(string json) {
            var evt = JsonEvent<TestEventBody>.FromJson(json);
            OnTest(evt);
        }

        protected virtual void OnTest(JsonEvent<TestEventBody> evt) {
            Tested?.Invoke(this, evt);
        }
    }
}

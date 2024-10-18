using Newtonsoft.Json.Linq;

namespace PurpleMonsterSystem {
    public class TestEventBody
    {
        public required string Message { get; set; }

        public override string ToString()
        {
            return Message;
        }
    }
        
    class TestEventPublisher {
        public delegate void TestEventHandler(object source, JsonEvent<TestEventBody> e);

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

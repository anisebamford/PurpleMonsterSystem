namespace PurpleMonsterSystem {
    class Logger {
        public void onEvent(object source, EventArgs e) {
            System.Console.WriteLine(e.ToString());
        }
    }
}

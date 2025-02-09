import "./App.scss";
import useStoredState from "./useStoredState";
import Markdown from "react-markdown";

function App() {
  const [chatLog, updateChatLog] = useStoredState('duckyState', []);

  const getFormattedDate = (date) => {
    return `${date.toLocaleTimeString()}`;
  };

  const appendToChatLog = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value.trim() !== '') {
        updateChatLog([
          ...chatLog,
          {
            message: event.target.value.trim(),
            date: new Date().toLocaleTimeString()
          }
        ]);
      }
      event.target.value = '';
    }
  }

  const clearLog = () => { updateChatLog([]); }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ducky.</h1>
      </header>
      <div id="chat-log">
        {chatLog.map((msg, i) => (
          <div key={i} className="chat-msg">
            <div className="date">{msg.date}</div>
            <div className="message">
              <Markdown>{msg.message}</Markdown>
            </div>
          </div>
        ))}
      </div>

      {
        chatLog.length > 0 ? <div className="clear-log" ><button onClick={() => clearLog()}>clear chat</button></div> : null
      }
      <div id="chat-input">
        <textarea
          type="text"
          id="chat-input"
          placeholder="Type your message. Press enter."
          onKeyUp={(e) => appendToChatLog(e)}
          rows="5"
        />
      </div>
      <div className="info">This supports markdown.</div>
    </div>
  );
}

export default App;

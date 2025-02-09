import "./App.scss";
import { useState, useRef, useEffect } from "react";
import useStoredState from "./useStoredState";
import Markdown from "react-markdown";

const KEY_UP = 'up';
const KEY_DOWN = 'down';

function App() {
  const [chatLog, updateChatLog] = useStoredState('duckyState', []);
  const [shiftState, updateShiftState] = useState(KEY_UP);
  const [showListening, updateListeningState] = useState(false);
  const [listeningTimeout, updateListeningTimeout] = useState(null);

  function setListeningTimeout() {
    console.log('starting listening timeout');
    clearTimeout(listeningTimeout);

    updateListeningState(false);
    updateListeningTimeout(setTimeout(() => updateListeningState(true), 15000));
  }

  const chatRef = useRef(null);
  const inputBox = useRef(null);

  useEffect(() => {
    if(inputBox.current) {
      inputBox.current.focus();
    }

    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatLog]);

  const handleKeyDown = (event) => {
    if (event.key === 'Shift') {
      updateShiftState(KEY_DOWN);
    }
  }

  const handleKeyUp = (event) => {
    const executing = event.key === 'Enter' && shiftState !== KEY_DOWN;

    setListeningTimeout();

    if (event.key === 'Shift') {
      updateShiftState(KEY_UP);
    }

    if (executing && event.target.value.trim().toLowerCase() === '.clear') {
      clearLog();
      event.target.value = '';
    } else if (executing) {
      appendToChatLog(event);
    }
  }

  const appendToChatLog = (event) => {
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

  const clearLog = () => { updateChatLog([]); }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ducky.</h1>
      </header>
      <div id="chat-log" ref={chatRef}>
        {chatLog.map((msg, i) => (
          <div key={i} className="chat-msg">
            <div className="date">{msg.date}</div>
            <div className="message">
              <Markdown>{msg.message}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="clear-log" >
        {
          chatLog.length > 0 && showListening ? <span className="listening">listening...</span> : null
        }
        {
          chatLog.length > 0 ? <button onClick={() => clearLog()}>clear chat</button> : null
        }
      </div>
      <div id="chat-input">
        <textarea
          ref={inputBox}
          type="text"
          id="chat-input"
          placeholder="Type then press enter."
          onKeyUp={(e) => handleKeyUp(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          rows="5"
        />
      </div>
      <div className="info">This supports markdown.</div>
    </div>
  );
}

export default App;

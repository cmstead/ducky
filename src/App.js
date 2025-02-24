import "./App.scss";
import { useRef, useEffect } from "react";
import useStoredState from "./useStoredState";
import React from "react";

import ChatLog from "./components/ChatLog/ChatLog.js";
import ChatBox from "./components/ChatBox/ChatBox.js";
import { confirm } from "./services/confirmService.js";

/** @typedef{{ current: unknown }} Ref */
/** 
 * @typedef {object} TextareaRef
 * @extends Ref
 * @property {HTMLTextAreaElement} current
*/
/** @typedef{{date: string; message: string}} Message*/

function App() {
  const /** @type{Message[]} */ initialChatLog = [];
  const [chatLog, updateChatLog] = useStoredState('duckyState', initialChatLog);

  let /** @type{?TextareaRef} */ inputBoxRef = useRef(null);

  useEffect(() => {
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }

  }, [chatLog]);

  const clearLog = () => {
    confirm("Are you sure you want to clear the chat log?")
      .then(() => updateChatLog([]))
      .catch(() => { });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ducky.</h1>
      </header>
      <ChatLog chatLog={chatLog} />
      <ChatBox chatLog={chatLog} clearLog={clearLog} updateChatLog={updateChatLog} inputBoxRef={inputBoxRef} />
    </div>
  );
}

export default App;

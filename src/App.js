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
/** @typedef{{date: string; message: string, selected: boolean }} Message*/

function App() {
  const /** @type{Message[]} */ initialChatLog = [];
  const [chatLog, updateChatLog] = useStoredState('duckyState', initialChatLog);

  let /** @type{?TextareaRef} */ inputBoxRef = useRef(null);

  useEffect(() => {
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }

  }, [chatLog.length]);

  const toggleChatNodeSelection = (index) => {
    const newChatLog = chatLog.map(( /** @type{Message} */ msg, /** @type{number} */ i) => {
      if (i === index) {
        return { ...msg, selected: !msg.selected };
      }

      return msg;
    });

    updateChatLog(newChatLog);
  }

  const deleteChatNode = (index) => {
    const newChatLog = chatLog.filter(( /** @type{unknown} */ _, /** @type{number} */ i) => i !== index);
    updateChatLog(newChatLog);
  }

  const clearLog = () => {
    confirm("Are you sure you want to clear unpinned messages?")
      .then(() => updateChatLog(chatLog.filter(( /** @type{Message} */ msg) => msg.selected)))
      .catch(() => { });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ducky.</h1>
      </header>
      <ChatLog chatLog={chatLog} deleteChatNode={deleteChatNode} toggleChatNodeSelection={toggleChatNodeSelection} />
      <ChatBox chatLog={chatLog}
        clearLog={clearLog}
        updateChatLog={updateChatLog}
        inputBoxRef={inputBoxRef} />
    </div>
  );
}

export default App;

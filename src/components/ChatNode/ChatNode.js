import React from "react";
import Markdown from "react-markdown";

export default function ChatNode({ message: msg, index, deleteChatNode }) {
    return (
        <div key={index} className="chat-msg">
            <div className="date">{msg.date}</div>
            <div className="message">
                <Markdown>{msg.message}</Markdown>
            </div>
            <div><button type="button" className="option" onClick={() => deleteChatNode(index)}>🆇</button></div>
        </div>
    );
}
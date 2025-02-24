import React from "react";
import Markdown from "react-markdown";

export default function ChatNode({ message: msg, key }) {
    return (
        <div key={key} className="chat-msg">
            <div className="date">{msg.date}</div>
            <div className="message">
                <Markdown>{msg.message}</Markdown>
            </div>
        </div>
    );
}
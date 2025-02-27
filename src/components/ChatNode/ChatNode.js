import React from "react";
import Markdown from "react-markdown";

export default function ChatNode({ message: msg, index, deleteChatNode, toggleChatNodeSelection }) {

    const pinNode = (e) => {
        e.stopPropagation();
        toggleChatNodeSelection(index);
    }

    const deleteNode = (e) => {
        e.stopPropagation();
        if (!msg.selected) {
            deleteChatNode(index);
        } else {
            pinNode(e);
        }
    }

    return (
        <div key={index} className={`chat-msg ${msg.selected ? 'selected-msg' : ''}`} onClick={pinNode}>
            <div className="date">{msg.date}</div>
            <div className="message">
                <Markdown>{msg.message}</Markdown>
            </div>
            <div>
                <button type="button" className="delete-option" onClick={deleteNode}>{msg.selected ? '📌' : '🆇'}</button>
            </div>
            <div className="clear">&nbsp;</div>
        </div>
    );
}
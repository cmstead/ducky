import React, { useEffect, useRef } from "react";
import ChatNode from "../ChatNode/ChatNode.js";

/** @typedef{import("../../App.js").Message} Message */

export default function ChatLog({ chatLog }) {
    let chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chatLog]);

    return (
        <div id="chat-log" ref={chatRef}>
            {chatLog.map((/** @type{Message} */ msg, i) => (<ChatNode key={i} message={msg} />))}
        </div>
    )
}
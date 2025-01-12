import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/favicon.png";
import plotch from "./assets/plotch.png"

function App() {
    const [userInput, setUserInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [response, setResponse] = useState("");

    const handleSend = async () => {
        if (!userInput) return alert("Please enter a message!");

        try {
            const res = await axios.post("https://chat-server-ten-brown.vercel.app/chat/", {
                message: userInput,
                conversation_history: conversationHistory
            });

            setResponse(res.data.response);
            setConversationHistory([...res.data.conversation_history]);
            setUserInput("");
        } catch (error) {
            alert("Error connecting to chatbot.");
        }
    };

    return (
        <div className="chat-container">

          <div className="title-cont">
          <img className="logo" src={logo} alt="" />
            <h1 className="title">Well Wise</h1>
          </div>
            <div className="chat-box">
                {conversationHistory.map((msg, index) => (
                    <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
                ))}
                {/* {response && <p><strong>Chatbot:</strong> {response}</p>} */}
            </div>
            <input
            className="in"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask something..."
            />
            <button onClick={handleSend}>Send</button>
            <img className="plotch" src={plotch} alt="" />
        </div>
    );
}

export default App;

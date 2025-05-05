import { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../Context/MyContext";
import "../pages/CSS/Chat.css";

const Chat = () => {
  const { user, setUser, messages, setMessages, users, updateUserOnlineStatus, addMessage } = useContext(MyContext);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(user.online);
  const [showEmojis, setShowEmojis] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const chunksRef = useRef([]);

  const handleSend = () => {
    if (newMessage.trim() === "" || !isOnline) return;
    const messageData = {
      id: Date.now(),
      sender: user.name || "Usuário",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(messageData);
    setNewMessage("");
  };

  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    setUser((prev) => ({ ...prev, online: newStatus }));
    updateUserOnlineStatus(user.id, newStatus);
    const statusMessage = {
      id: Date.now(),
      sender: "BOT",
      text: `${user.name || "Usuário"} ${newStatus ? "entrou no chat" : "saiu do chat"}.`,
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(statusMessage);
  };

  const toggleEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const startRecording = async () => {
    if (!isOnline || isRecording) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      const messageData = {
        id: Date.now(),
        sender: user.name || "Usuário",
        text: "",
        audio: audioUrl,
        timestamp: new Date().toLocaleTimeString(),
      };
      addMessage(messageData);
      chunksRef.current = [];
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    setIsRecording(false);
  };
  const handleImageChange = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUser((prev) => ({ ...prev, photo: imageUrl }));
      }
    };
    fileInput.click();
  };
  
  return (
    <main className="main-container">
      <div className="chat-container">
        <div className="chat-header">
          <img
            src={user.photo || "https://via.placeholder.com/40"}
            alt="Foto de perfil"
            className="chat-avatar"
          />
          <button 
            onClick={handleImageChange}
            className="change-image-button"
            title="Alterar foto"
          >
            ✏️
          </button>
          <div>
            <div className="chat-username">{user.name || "Usuário Anônimo"}</div>
            <div className="chat-status">
              <span className={isOnline ? "online-dot" : "offline-dot"}></span>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-message-item">
              <strong>{msg.sender}:</strong> {msg.text}
              {msg.audio && (
                <audio controls className="audio-player">
                  <source src={msg.audio} type="audio/webm" />
                </audio>
              )}
              {msg.file && (
                <div className="chat-file-preview">
                  {msg.fileType.startsWith("image/") ? (
                    <img src={msg.file} alt={msg.fileName} className="chat-image" />
                  ) : (
                    <a href={msg.file} download={msg.fileName} target="_blank" rel="noopener noreferrer">
                      📎 {msg.fileName}
                    </a>
                  )}
                </div>
              )}
              <div className="chat-timestamp">{msg.timestamp}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <button onClick={toggleEmojis} className="emoji-button" disabled={!isOnline}>😀</button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder={isOnline ? "Digite sua mensagem..." : "Chat indisponível (offline)"}
            className="chat-input"
            disabled={!isOnline}
          />


          <label htmlFor="file-upload" className="file-attach-button" title="Enviar arquivo">
            📎
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            disabled={!isOnline}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const fileUrl = URL.createObjectURL(file);
                const messageData = {
                  id: Date.now(),
                  sender: user.name || "Usuário",
                  text: `📎 Arquivo enviado: ${file.name}`,
                  file: fileUrl,
                  fileName: file.name,
                  fileType: file.type,
                  timestamp: new Date().toLocaleTimeString(),
                };
                addMessage(messageData);
              }
              e.target.value = null;
            }}
          />

          <button onClick={handleSend} className="chat-button" disabled={!isOnline}>Enviar</button>
        </div>

        <div className="audio-controls">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="audio-button"
            disabled={!isOnline}
          >
            {isRecording ? "■" : "🎤"}
          </button>
        </div>

        {showEmojis && (
          <div className="emoji-panel">
            <button onClick={() => addEmoji("😀")}>😀</button>
            <button onClick={() => addEmoji("😁")}>😁</button>
            <button onClick={() => addEmoji("😂")}>😂</button>
            <button onClick={() => addEmoji("❤️")}>❤️</button>
            <button onClick={() => addEmoji("👍")}>👍</button>
            <button onClick={() => addEmoji("😢")}>😢</button>
            <button onClick={() => addEmoji("😎")}>😎</button>
            <button onClick={() => addEmoji("😍")}>😍</button>
          </div>
        )}

        <button onClick={toggleOnlineStatus} className="status-toggle-button">
          {isOnline ? "Sair do Chat" : "Entrar no Chat"}
        </button>
      </div>

    </main>
  );
};

export default Chat;

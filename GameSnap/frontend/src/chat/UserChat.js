// ChatPage.js

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Enterprivate } from "../axios/ChatAxios";

const UserChat = ({ onClose }) => {
  const { userId } = useParams(); // URL에서 userId 가져오기
  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const [newMessage, setNewMessage] = useState(""); // 새 메시지 입력 상태
  const [isVisible, setIsVisible] = useState(true);
  const profileRef = useRef(null);

  // 컴포넌트가 마운트될 때 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await Enterprivate(userId); // userId로 메시지 가져오기
      if (response) {
        setMessages(response.data.messages); // 가져온 메시지를 상태에 저장
      }
    };
    fetchMessages();
  }, [userId]);

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // 여기에 메시지 전송 API를 추가할 수 있습니다.
    const updatedMessages = [...messages, { text: newMessage, sender: "me" }];
    setMessages(updatedMessages); // 전송 후 메시지 목록 업데이트
    setNewMessage(""); // 입력 필드 초기화
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 시간
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div ref={profileRef} className="bg-white rounded-lg w-full max-w-md relative z-60 p-10">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                    transition-colors duration-200"         
        >
          ✕
        </button>
        <div className="chat-messages mb-4 max-h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="chat-input flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="border rounded-l-lg p-2 w-full"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
            Send
          </button>
        </div>
      </div>
    </div> 
  );
};


export default UserChat;
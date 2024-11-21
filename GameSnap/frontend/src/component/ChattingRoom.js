import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useAuth } from '../context/AuthContext'; // 인증 컨텍스트 추가

const ChattingRoom = ({ isOpen, onClose, friend }) => {
  const { userData } = useAuth(); // AuthContext에서 사용자 정보 가져오기
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageRoomId, setMessageRoomId] = useState('');
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const createOrJoinChatRoom = async () => {
      try {
        const checkResponse = await axios.get('http://localhost:1111/checkMessageRoom', {
          params: {
            makerId: userData.id,
            guestId: friend.id 
          },
          withCredentials: true,
        });

        if (checkResponse.status === 200 && checkResponse.data !== "해당 멤버들로 개설된 채팅방을 찾을 수 없습니다.") {
          setMessageRoomId(checkResponse.data);
          fetchMessages(checkResponse.data);
          connectWebSocket(checkResponse.data);
          console.log("채팅방 아이디 : ", checkResponse.data)
        } else {
          console.log('채팅방 개설 로직 실행');
          const response = await axios.post('http://localhost:1111/personal', {
            makerId: userData.id,
            guestId: friend.id,
          });
          setMessageRoomId(response.data.messageRoomId);
          connectWebSocket(response.data.messageRoomId);
        }
      } catch (error) {
          console.error('Error checking or creating chat room:', error);
      }
    };

    const fetchMessages = async (roomId) => {
      try {
        const response = await axios.get(`http://localhost:1111/messages/${roomId}`);
        if (response.status === 200 && response.data) {
          setMessages(response.data); // 이전 메시지들을 상태에 설정
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const connectWebSocket = (roomId) => {
      const socket = new SockJS('http://localhost:1111/chat/inbox');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        client.subscribe(`/sub/channel/${roomId}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);

          setMessages((prev) => {
            const isDuplicate = prev.some((msg) => msg.id === message.id);
            if (isDuplicate) return prev;
            return [...prev, message];
          });
        });
      });

      stompClientRef.current = client;
    };

    if (friend) {
      createOrJoinChatRoom();
    }

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => console.log('WebSocket Disconnected'));
      }
    };
  }, [friend]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !friend) {
      console.warn("메시지가 비어있거나 친구 정보가 없습니다.");
      return;
    }

    if (!stompClientRef.current || !stompClientRef.current.connected) {
      console.error("WebSocket is not connected.");
      return;
    }

    try {
      const message = {
        messageRoomId: messageRoomId,
        memberId: userData.id, // AuthContext에서 가져온 사용자 ID 사용
        content: newMessage,
      };

      stompClientRef.current.send('/pub/message', {}, JSON.stringify(message));
      setNewMessage('');
      console.log('message.memberId:', message.memberId);
      console.log('userData.id:', userData.id);

    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />}

      <div
        className={`fixed top-1/2 left-1/2 w-[480px] h-[600px] bg-white shadow-lg rounded-lg z-[110]
                    transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="ml-3">
              <div className="font-medium">{friend?.name || '친구 이름'}</div>
              <div className="text-sm text-gray-500">{friend?.status || '오프라인'}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(600px-132px)] p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.memberId === userData.id ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.memberId === userData.id
                    ? 'bg-green-500 text-white rounded-tr-none self-start'
                    : 'bg-gray-300 text-black rounded-tl-none self-end'
                }`}
              >
                {message.content}
              </div>
              <span className="text-xs text-gray-500 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 p-2 border rounded-lg"
            />
            <button type="submit" className="p-2 bg-green-500 text-white rounded-lg">
              <Send size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChattingRoom;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useAuth } from '../context/AuthContext';

const ChattingRoom = ({ isOpen, onClose, friend }) => {
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageRoomId, setMessageRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // 스크롤방지 useEffect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 스크롤 자동 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 업데이트 핸들러
  const updateMessages = useCallback((newMessage) => {
    console.log('메시지 업데이트 핸들러')
    setMessages(prev => {
      const isDuplicate = prev.some(msg => 
        msg.id === newMessage.id || 
        (msg.content === newMessage.content && 
         msg.memberId === newMessage.memberId &&
         Math.abs(new Date(msg.createdAt) - new Date(newMessage.createdAt)) < 1000)
      );
      
      if (isDuplicate) return prev;
      
      const updated = [...prev, newMessage];
      return updated.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
  }, []);

  // WebSocket 연결
  const connectWebSocket = useCallback((roomId) => {
    if (stompClientRef.current?.connected) {
      console.log('Already connected');
      return;
    }

    console.log('Connecting to WebSocket...', roomId);
    const socket = new SockJS('http://localhost:1111/chat/inbox');
    // const socket = new WebSocket('wss://6535-112-217-82-146.ngrok-free.app/chat/inbox');
    const client = Stomp.over(socket);
    
    client.debug = () => {};

    socket.onopen = () => {
      console.log('SockJS Connection Opened');
    };

    socket.onclose = (event) => {
      console.log('SockJS Connection Closed:', event);
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('SockJS Error:', error);
      setIsConnected(false);
    };

    client.connect({},
      () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        
        client.subscribe(`/sub/channel/${roomId}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          console.log('Received message:', message);
          updateMessages(message);
        });
      },
      (error) => {
        console.error('WebSocket Connection Error:', error);
        setIsConnected(false);
        
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket(roomId);
        }, 3000);
      }
    );

    stompClientRef.current = client;
  }, [updateMessages]);

  // 채팅방 생성 또는 참여
  const createOrJoinChatRoom = async () => {
    try {
      console.log('채팅방에 생성/참여 중....');
      console.log('User ID:', userData?.id);
      console.log('Friend ID:', friend?.id);

      const checkResponse = await axios.get('http://localhost:1111/checkMessageRoom', {
        params: {
          makerId: userData.id,
          guestId: friend.id
        }
      });

      if (checkResponse.status === 200 && checkResponse.data !== "해당 멤버들로 개설된 채팅방을 찾을 수 없습니다.") {
        console.log('이미 존재하는 채팅방을 찾았어요 :', checkResponse.data);
        setMessageRoomId(checkResponse.data);
        await fetchMessages(checkResponse.data);
        connectWebSocket(checkResponse.data);
      } else {
        console.log('새 채팅방 생성중...');
        const response = await axios.post('http://localhost:1111/personal', {
          makerId: userData.id,
          guestId: friend.id,
        });
        console.log('새 채팅방이 만들어졌어요:', response.data);
        setMessageRoomId(response.data.messageRoomId);
        connectWebSocket(response.data.messageRoomId);
      }
    } catch (error) {
      console.error('createOrJoinChatRoom에 에러 존재 :', error);
    }
  };

  // 이전 메시지 로드
  const fetchMessages = async (roomId) => {
    console.log('이전 메시지 로드')
    try {
      const response = await axios.get(`http://localhost:1111/messages/${roomId}`);
      if (response.status === 200 && response.data) {
        console.log('Fetched previous messages:', response.data);
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // 메시지 전송
  const handleSendMessage = async (e) => {
    console.log('메시지 전송')
    e.preventDefault();

    if (!newMessage.trim() || !friend) {
      return;
    }

    if (!stompClientRef.current?.connected) {
      console.log('Reconnecting...');
      connectWebSocket(messageRoomId);
      return;
    }

    try {
      const message = {
        messageRoomId: messageRoomId,
        memberId: userData.id,
        content: newMessage,
        timestamp: new Date().getTime()
      };

      console.log('Sending message:', message);
      stompClientRef.current.send('/pub/message', {}, JSON.stringify(message));
      setNewMessage('');

      updateMessages({
        ...message,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString()
      });

    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  // 컴포넌트 마운트/언마운트 처리
  useEffect(() => {
    if (friend && isOpen) {
      createOrJoinChatRoom();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stompClientRef.current) {
        console.log('Disconnecting WebSocket');
        stompClientRef.current.disconnect();
        stompClientRef.current = null;
        setIsConnected(false);
      }
    };
  }, [friend, isOpen, connectWebSocket]);

  // 이벤트 전파 방지
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
    {/* 오버레이 z인덱스 추가 및 구조 수정 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[100]" 
          onClick={(e) => e.preventDefault()}
          style={{ cursor: 'default' }}
        />
      )}

      <div
      // 채팅방 이벤트 방지 함수 추가
        onClick={handleModalClick} 
        className={`fixed top-1/2 left-1/2 w-[480px] h-[600px] bg-white shadow-lg rounded-lg z-[110]
                    transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                            ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="ml-3">
              <div className="font-medium">{friend?.name || '친구 이름'}</div>
              <div className="text-sm text-gray-500">
                {isConnected ? '온라인' : '연결 중...'}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* 메시지 목록 */}
        <div className="flex flex-col h-[calc(600px-132px)] p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.memberId === userData.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.memberId === userData.id
                    ? 'bg-green-500 text-white rounded-tl-none'
                    : 'bg-gray-300 text-black rounded-tr-none'
                }`}
              >
                <div>{message.content}</div>
                <div className="text-xs opacity-75 mt-1">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 */}
        <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 p-2 border rounded-lg"
              disabled={!isConnected}
            />
            <button 
              type="submit" 
              className={`p-2 text-white rounded-lg transition-colors
                        ${isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'}`}
              disabled={!isConnected}
            >
              <Send size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChattingRoom;
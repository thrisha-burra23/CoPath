import React from 'react'
import { useParams } from 'react-router-dom'
import ChatBox from '../components/chat/ChatBox';

const ChatPage = () => {
    const {rideId,otherUserId}=useParams();
  return (
     <div className="min-h-screen p-8">
      <ChatBox rideId={rideId} otherUserId={otherUserId} />
    </div>
  )
}

export default ChatPage
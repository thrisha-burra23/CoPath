import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useRideChat, useSendMessage } from "@/src/reactQuery/chatHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ChatBox = () => {
  const { rideId, otherUserId } = useParams();
  const { data: user } = useAuthUser();

  const { data: allMessages = [] } = useRideChat(rideId);
  const sendMutation = useSendMessage();

  const [input, setInput] = useState("");

  if (!user) return null;

  // ✅ 1:1 FILTER HERE
  const messages = allMessages.filter(
    (msg) =>
      (msg.senderId === user.$id &&
        msg.receiverId === otherUserId) ||
      (msg.senderId === otherUserId &&
        msg.receiverId === user.$id)
  );

  const handleSend = () => {
    if (!input.trim()) return;

    sendMutation.mutate({
      rideId,
      senderId: user.$id,
      receiverId: otherUserId,
      message: input,
    });

    setInput("");
  };

  return (
    <Card className="mt-6 shadow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          💬 Ride Chat
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-72 overflow-y-auto border rounded-md p-3 space-y-3 bg-gray-50 flex flex-col">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              No messages yet
            </p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.$id}
              className={`flex ${
                msg.senderId === user.$id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm shadow-sm max-w-xs ${
                  msg.senderId === user.$id
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button size="sm" onClick={handleSend}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
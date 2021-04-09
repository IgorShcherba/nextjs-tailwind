import { useState, useRef } from "react";
import Layout from "components/Layout";
import { ToastContainer } from "react-toastify";

import { useSession } from "next-auth/client";
import { Chat } from "components/Chat";
import { useChat } from "hooks/useChat";

type User = {
  name: string;
  connectionTime: string;
  id: string;
};

type Message = {
  createdAt: string;
  user: User;
  msg: string;
};

const ChatPage = () => {
  const [session] = useSession();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { isConnected, send } = useChat({
    onMessage: (data) => {
      setMessages((prev) => [...prev, data]);
      scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const handleSend = (message: string) => {
    send(message);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center my-8 font-bold">Socket.io</h1>
        {isConnected ? (
          <Chat
            ref={scrollContainerRef}
            messages={messages}
            userId={session?.user.name!}
            onSend={handleSend}
          />
        ) : (
          "Connecting ..."
        )}
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default ChatPage;
import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useSession } from "next-auth/client";
import Layout from "components/Layout";
import { Chat } from "components/Chat";
import { Container } from "components/Container";
import { useChat } from "hooks/useChat";
import { Message } from "interfaces";
import { fetcher } from "utils/fetcher";
import { format, parseISO } from "date-fns";
import { DATE_FORMAT } from "constants/index";
import withAuthentication from "hocs/withAuthentication";
import { Prisma } from ".prisma/client";

type MessagesWithUser = {
  id: number;
  content: string;
  createdAt: string;
  author: Prisma.UserCreateInput;
  authorId: number;
};

type InitMessages = Array<MessagesWithUser>;

const normalizeInitialMessages = (initData: InitMessages = []) =>
  initData.map((item) => ({
    createdAt: format(parseISO(item.createdAt), DATE_FORMAT),
    message: item.content,
    user: { id: item?.authorId, name: item.author.name },
  }));

const ChatPage = () => {
  const [session] = useSession();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { isConnected, send } = useChat({
    onMessage: (data) => {
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSend = (message: string) => {
    send(message, session?.user.id as number);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await fetcher("/messages");
        setMessages(normalizeInitialMessages(data));
      } catch (err) {
        // TODO: error handling
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    if (messages.length < 1) return;

    scrollContainerRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <Layout>
      <Container className="max-w-xl">
        <h1 className="text-center my-8 font-bold">Socket.io</h1>
        {isConnected ? (
          <Chat
            ref={scrollContainerRef}
            messages={messages}
            userId={session?.user.id as number}
            onSend={handleSend}
          />
        ) : (
          "Connecting ..."
        )}
      </Container>

      <ToastContainer />
    </Layout>
  );
};

export default withAuthentication(ChatPage);

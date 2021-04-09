import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import { toast } from "react-toastify";
import {
  DISCONNECT_EVENT,
  LOGIN_EVENT,
  MESSAGE_EVENT,
} from "constants/socket-events";
import { Message } from "interfaces";

const socket = io();

type Props = {
  onMessage?: (data: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
};

export const useChat = ({ onMessage, onConnect, onDisconnect }: Props) => {
  const [session] = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const send = (message: string) => {
    socket.emit(MESSAGE_EVENT, message);
  };

  useEffect(() => {
    if (!session) return;

    const createWsConnection = async () => {
      try {
        if (error) setError(null);
        await fetch("/api/socketio");
      } catch (err) {
        setError(err);
        toast("Something went wrong! Please, try again.");
        return;
      }
      onConnect?.();
      setIsConnected(true);
      socket.emit(LOGIN_EVENT, session?.user.name);

      socket.on(MESSAGE_EVENT, (data: Message) => {
        onMessage?.(data);
      });

      socket.on(LOGIN_EVENT, (user) => {
        toast(`${user.name} is connected!`, { toastId: user.id });
      });

      socket.on(DISCONNECT_EVENT, () => {});
    };

    createWsConnection();

    return () => {
      setIsConnected(false);
      socket.disconnect();
      onDisconnect?.();
    };
  }, [error, session]);

  return { isConnected, error, send };
};

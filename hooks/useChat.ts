import { useSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { toast } from "react-toastify";
import { LOGIN_EVENT, MESSAGE_EVENT } from "constants/socket-events";
import { Message } from "interfaces";

type Props = {
  onMessage?: (data: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
};

export const useChat = ({ onMessage, onConnect, onDisconnect }: Props) => {
  const [session] = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const sockerRef = useRef();
  sockerRef.current = io();

  const send = (message: string, userId: number) => {
    sockerRef.current?.emit(MESSAGE_EVENT, { message, userId });
  };

  useEffect(() => {
    if (!session) return;
    const socket = sockerRef.current;
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
      socket.emit(LOGIN_EVENT, { ...session.user });

      socket.on(MESSAGE_EVENT, (data: Message) => {
        onMessage?.(data);
      });

      socket.on(LOGIN_EVENT, (name) => {
        toast(`${name} is connected!`);
      });

      // socket.on(DISCONNECT_EVENT, () => {});
    };

    createWsConnection();

    return () => {
      setIsConnected(false);
      socket.disconnect();
      onDisconnect?.();
      socket.current = null;
    };
  }, [error, session]);

  return { isConnected, error, send };
};

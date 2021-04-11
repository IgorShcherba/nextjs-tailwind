import { useSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

import { toast } from "react-toastify";
import { LOGIN_EVENT, MESSAGE_EVENT } from "constants/socket-events";
import { Message } from "interfaces";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

type Props = {
  onMessage?: (data: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
};

export const useChat = ({ onMessage, onConnect, onDisconnect }: Props) => {
  const [session] = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const sockerRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const send = (message: string, userId: number) => {
    sockerRef.current?.emit(MESSAGE_EVENT, { message, userId });
  };

  useEffect(() => {
    if (!session) return;

    sockerRef.current = io();
    let socket = sockerRef.current;

    const createWsConnection = async () => {
      fetch("/api/socketio").finally(() => {
        onConnect?.();

        setIsConnected(true);
        socket?.emit(LOGIN_EVENT, { ...session.user });

        socket?.on(MESSAGE_EVENT, (data: Message) => {
          onMessage?.(data);
        });

        socket?.on(LOGIN_EVENT, (name) => {
          toast(`${name} is connected!`);
        });
      });
    };

    createWsConnection();

    return () => {
      setIsConnected(false);
      socket?.disconnect();
      onDisconnect?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return { isConnected, send };
};

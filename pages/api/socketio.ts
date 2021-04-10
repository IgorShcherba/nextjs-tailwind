import prisma from "lib/prisma";
import { User, MessageData } from "interfaces/index";
import { Server } from "socket.io";
import {
  MESSAGE_EVENT,
  CONNECT_EVENT,
  LOGIN_EVENT,
} from "constants/socket-events";
import { format } from "date-fns";
import { DATE_FORMAT } from "constants/index";

let users = new Map();

const createMessageService = async (data: any) => {
  const { message, user } = data;

  const result = await prisma.message.create({
    data: {
      content: message,
      author: { connect: { id: user.id } },
      published: true,
    },
  });
  return result;
};

const ioHandler = (_: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on(CONNECT_EVENT, (socket) => {
      socket.on(MESSAGE_EVENT, async ({ message, userId }) => {
        const data = {
          user: { name: users.get(userId).user.name, id: userId },
          message,
          createdAt: format(new Date(), DATE_FORMAT),
        };

        const entity = await createMessageService(data);

        console.log("entitty", entity);
        io.emit(MESSAGE_EVENT, data);
      });

      socket.on(LOGIN_EVENT, (user: User) => {
        if (users.has(user.id)) return;

        const userData: MessageData = {
          id: user.id,
          user,
          connectionTime: format(new Date(), DATE_FORMAT),
        };

        socket.broadcast.emit(LOGIN_EVENT, user.name);
        users.set(user.id, userData);

        console.log("users", users);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;

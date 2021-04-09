import { UserData } from "interfaces/index";
import { Server } from "socket.io";

import {
  MESSAGE_EVENT,
  CONNECT_EVENT,
  LOGIN_EVENT,
} from "constants/socket-events";
import { format } from "date-fns";

const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

let users = new Map();

const ioHandler = (_: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on(CONNECT_EVENT, (socket) => {
      socket.on(MESSAGE_EVENT, (msg: string) => {
        io.emit(MESSAGE_EVENT, {
          user: users.get(socket.id),
          msg,
          createdAt: format(new Date(), DATE_FORMAT),
        });
      });

      socket.on(LOGIN_EVENT, (userName: string) => {
        const userData: UserData = {
          id: socket.id,
          name: userName,
          connectionTime: format(new Date(), DATE_FORMAT),
        };

        socket.broadcast.emit(LOGIN_EVENT, userData);
        users.set(socket.id, userData);

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

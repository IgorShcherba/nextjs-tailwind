// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//

export type MessageData = {
  id: number;
  connectionTime: string;
  user: User;
};

export type User = {
  email: string | null;
  id: number;
  image: string;
  name: string;
};

export type Message = {
  createdAt: string;
  user: { id: number; name: string };
  message: string;
};

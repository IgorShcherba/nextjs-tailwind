// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//

export type UserData = {
  id: string;
  name: string;
  connectionTime: string;
};

export type Message = {
  createdAt: string;
  user: UserData;
  msg: string;
};

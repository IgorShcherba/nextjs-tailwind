import { Message } from "interfaces";
import { useState, forwardRef, ForwardedRef, SyntheticEvent } from "react";
import { Button } from "./Button";
import Input from "./Input";

type ChatProps = {
  messages: Array<Message>;
  userId: number;
  onSend: (msg: string) => void;
};

type Ref = HTMLDivElement;

export const Chat = forwardRef<Ref, ChatProps>(
  ({ messages, userId, onSend }, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleSend = (e: SyntheticEvent) => {
      e.preventDefault();

      if (inputValue.trim()) {
        onSend(inputValue);
        setInputValue("");
      }
    };

    return (
      <>
        <div className="bg-gray-50 h-52 md:h-80 p-6 overflow-y-auto overflow-x-hidden relative">
          <ul className="flex flex-col items-start space-y-8">
            {messages.map(
              ({ createdAt, message, user: { name, id } }: Message) => {
                const isMine = id === userId;
                return (
                  <li
                    className={`${
                      isMine ? "ml-auto bg-green-600 text-white" : "bg-blue-200"
                    } rounded-md px-3 py-1  relative max-w-xs break-words`}
                    key={createdAt}
                  >
                    {message}
                    <span
                      className={`absolute -inset-4  left-0 text-xs whitespace-nowrap text-gray-400 ${
                        isMine ? "right-0 left-auto" : "left-0"
                      } `}
                    >
                      {isMine ? "You" : name}, {createdAt}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
          <div ref={ref}></div>
        </div>
        <form onSubmit={handleSend} className="w-full flex flex-col">
          <div className="my-6">
            <Input
              name="message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <Button size="sm" submit className="sm:ml-auto">
            Send
          </Button>
        </form>
      </>
    );
  }
);

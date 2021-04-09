import { useSession } from "next-auth/client";
import NextLink from "next/link";

export const Navbar = () => {
  const [session] = useSession();

  return (
    <nav className="h-12  border-t border-b border-gray-100 flex items-center">
      <div className="container mx-auto px-4">
        <NextLink href="/">
          <a className="hover:underline mr-4">Home</a>
        </NextLink>
        {!!session && (
          <NextLink href="/chat">
            <a className="hover:underline mr-4">Chat</a>
          </NextLink>
        )}
      </div>
    </nav>
  );
};

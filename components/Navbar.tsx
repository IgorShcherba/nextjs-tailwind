import { useSession } from "next-auth/client";
import NextLink from "next/link";
import { Container } from "./Container";

export const Navbar = () => {
  const [session] = useSession();

  return (
    <nav className="h-12  border-t border-b border-gray-100 flex items-center">
      <Container>
        <NextLink href="/">
          <a className="hover:underline mr-4">Home</a>
        </NextLink>
        {!!session && (
          <NextLink href="/chat">
            <a className="hover:underline mr-4">Chat</a>
          </NextLink>
        )}
      </Container>
    </nav>
  );
};

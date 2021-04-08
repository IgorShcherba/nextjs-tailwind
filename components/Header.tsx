import React from "react";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { Button } from "./Button";

export const Header: React.FC = () => {
  const [session] = useSession();

  console.log("session", session);

  const handleSignin = () => {
    signIn();
  };

  const handleSignout = () => {
    signOut();
  };

  return (
    <header className="py-4 flex justify-between">
      <div className="container px-4 mx-auto flex justify-between">
        {session && (
          <div className="flex items-center">
            <img
              src={`${session.user?.image}`}
              className="rounded-full object-cover mr-2 w-10 h-auto"
            />
            <NextLink href="/account">
              <a className="hover:text-blue-700">{session.user?.name}</a>
            </NextLink>
          </div>
        )}
        {!session && (
          <Button
            color="success"
            size="sm"
            onClick={handleSignin}
            className="ml-auto"
          >
            Sign in
          </Button>
        )}

        {session && (
          <Button
            color="danger"
            size="sm"
            className="ml-2"
            onClick={handleSignout}
          >
            Sign out
          </Button>
        )}
      </div>
    </header>
  );
};

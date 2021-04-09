import React from "react";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { Button } from "./Button";

type HeaderProps = {
  onSignin?: () => void;
  onSignout?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onSignin, onSignout }) => {
  const [session] = useSession();

  const handleSignin = () => {
    signIn();
    onSignin?.();
  };

  const handleSignout = () => {
    signOut();
    onSignout?.();
  };
  console.log("Session", session);
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
          <Button size="sm" className="ml-2" onClick={handleSignout}>
            Sign out
          </Button>
        )}
      </div>
    </header>
  );
};

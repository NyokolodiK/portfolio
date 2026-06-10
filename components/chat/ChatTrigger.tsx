"use client";

import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function ChatTrigger({ isOpen, onClick }) {
  return (
    <Button
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-accent hover:bg-accent-hover text-primary shadow-lg p-0 relative"
      size="sm"
    >
      {isOpen ? (
        <IoMdClose className="h-7 w-7" />
      ) : (
        <>
          <IoChatbubbleEllipsesOutline className="h-7 w-7" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-primary"></span>
        </>
      )}
    </Button>
  );
}

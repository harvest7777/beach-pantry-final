"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import { IoArrowBack, IoArrowBackSharp } from "react-icons/io5";

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const goForward = () => {
    router.forward();
  };
  return (
    <div className="w-full flex items-center justify-between align-middle px-5">
      <IoArrowBackSharp
        onClick={() => goBack()}
        className="hover:text-primary text-4xl hover:cursor-pointer"
      />
      <h1 className="text-4xl font-bold text-center my-5">{children}</h1>
      <IoArrowBackSharp
        onClick={() => goForward()}
        className="hover:text-primary text-4xl hover:cursor-pointer rotate-180"
      />
    </div>
  );
};

export default Title;

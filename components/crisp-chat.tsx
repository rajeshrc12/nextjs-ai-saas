"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("f316b444-1da7-4a34-9cd8-61edd12d619d");
  }, []);
  return null;
};

export default CrispChat;

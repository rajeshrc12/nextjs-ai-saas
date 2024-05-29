"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

interface CrispChatProps {
  apiKey: string;
}
const CrispChat = ({ apiKey }: CrispChatProps) => {
  useEffect(() => {
    if (apiKey) Crisp.configure(apiKey);
  }, [apiKey]);
  return null;
};

export default CrispChat;

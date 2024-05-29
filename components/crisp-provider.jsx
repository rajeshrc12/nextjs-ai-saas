import CrispChat from "@/components/crisp-chat";

const CrispProvider = () => {
  const apiKey = process.env.CRISP_API_KEY;
  return <CrispChat apiKey={apiKey} />;
};

export default CrispProvider;

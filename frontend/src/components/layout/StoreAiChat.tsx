import { AIChatBubble } from "@components/ui";
import { useApi } from "@app/hooks";

export function StoreAiBubble() {
  const { askAboutStore } = useApi().ai;

  return (
    <div className="fixed bottom-6 right-0 px-md">
      <AIChatBubble
        className="w-full sm:w-[500px]"
        title="Store Assistant"
        systemMessage={`Hello! I am here to help you with any 
                questions you have about the shop and its products. 
                Feel free to ask me anything!`}
        apiCall={askAboutStore}
        initialOpen={false}
      />
    </div>
  );
}

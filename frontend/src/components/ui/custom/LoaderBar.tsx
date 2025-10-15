import type { FC } from "react";

interface LoaderBarProps {
  text?: string;
}

const LoaderBar: FC<LoaderBarProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {text && <div className="text-2xl font-semibold mb-4">{text}</div>}
      <div className="flex space-x-2">
        <div
          className="w-5 h-5 bg-primary rounded-full animate-[bounce_1s_infinite]"
          style={{ animationDelay: "-0.32s" }}
        ></div>
        <div
          className="w-5 h-5 bg-primary rounded-full animate-[bounce_1s_infinite]"
          style={{ animationDelay: "-0.16s" }}
        ></div>
        <div className="w-5 h-5 bg-primary rounded-full animate-[bounce_1s_infinite]"></div>
        <div className="w-5 h-5 bg-primary rounded-full animate-[bounce_1s_infinite]"></div>
      </div>

      {/* Inline arbitrary keyframes to make bounce higher */}
      <style>
        {`
					@keyframes bounce {
						0%, 100% { transform: translateY(0); }
						50% { transform: translateY(-50%); } /* adjust height here */
					}
				`}
      </style>
    </div>
  );
};

export { LoaderBar };

import React from "react";

const EarnCard: React.FC<{ imagePath: string; text: string }> = ({
  imagePath,
  text,
}) => {
  return (
    <a
      href="#" 
      className="flex flex-col justify-end items-center w-[380px] h-[175px] rounded-8 bg-primary bg-opacity-50 overflow-hidden drop-shadow"
      style={{ backgroundImage: `url("${imagePath}")` }}
    >
      <div className="flex-center w-full h-32 text-center text-16 text-white font-semibold backdrop-blur-md">
        {text}
      </div>
    </a>
  );
};

export const EarnCards: React.FC = () => {
  return (
    <div className="flex-center flex-row gap-x-32">
      <EarnCard imagePath="/images/acala-win.png" text="Earn Up to 12% on Your Ideal Assets" />
      <EarnCard imagePath="/images/acala-win.png" text="Earn Up to 12% on Your Ideal Assets" />
      <EarnCard imagePath="/images/acala-win.png" text="Earn Up to 12% on Your Ideal Assets" />
    </div>
  );
};

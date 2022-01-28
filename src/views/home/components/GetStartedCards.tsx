import React from "react";
import { Card } from "../../../components/Card";

const GetStartedCard: React.FC<{
  cardNum: number;
  title: string;
  desc: string;
  buttonText: string;
}> = ({ cardNum, title, desc, buttonText }) => {
  return (
    <Card
      className="flex flex-col justify-start items-center gap-32 py-34 w-[284px] h-[318px] drop-shadow-sm"
      variant="gradient-border"
    >
      <div className="flex-center w-[48px] h-[48px] rounded-full bg-gradient-primary-light">
        <div className="flex-center bg-white h-[44px] w-[44px] rounded-full">
          <div className="absolute flex-center w-[38px] h-[38px] bg-gradient-light rounded-full"></div>
          <div className="text-20 text-transparent bg-clip-text bg-gradient-to-br from-acala-orange-500 via-acala-pink-500 to-acala-blue-500 font-sans font-semibold">
            {cardNum}
          </div>
        </div>
      </div>
      <div className="flex-center flex-col gap-16">
        <div className="text-16 text-494853 font-semibold font-montserrat">
          {title}
        </div>
        <div className="w-[190px] h-[40px] text-center text-14 text-7b7986 font-medium">
          {desc}
        </div>
      </div>
      <div className="flex-center flex-col gap-8">
        <a
          href="#"
          className="flex-center text-14 text-white font-medium bg-primary rounded-12 w-[140px] h-32 cursor-pointer"
        >
          {buttonText}
        </a>
        {buttonText === "Connect" ? (
          <div className="text-[11px] text-gray-400 font-medium">
            Already have a wallet?{" "}
            <span className="text-primary cursor-pointer underline">
              Connect wallet
            </span>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export const GetStartedCards: React.FC = () => {
  return (
    <div className="flex-center gap-20">
      <GetStartedCard
        cardNum={1}
        title="Connect to a Wallet"
        desc="Connect to a wallet to view your information."
        buttonText="Connect"
      />
      <GetStartedCard
        cardNum={2}
        title="Buy crypto"
        desc="Become a DOT holder."
        buttonText="Buy crypto"
      />
      <GetStartedCard
        cardNum={3}
        title="Bridge to Acala"
        desc="Bridge assets to Acala to trade and earn."
        buttonText="Bridge"
      />
      <GetStartedCard
        cardNum={4}
        title="Earn"
        desc="Explore various programs to earn."
        buttonText="Earn"
      />
    </div>
  );
};

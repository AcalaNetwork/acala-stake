import React from "react";
import AcaIcon from "/public/images/acala-gray.svg";
import DiscordIcon from "/public/socials/discord-pink.svg";
import BookIcon from "/public/socials/book-pink.svg";
import Link from "next/link";
import { useBlockNumebr } from "../../connector/hooks/useBlockNumber";
import { Spacing } from "../Spacing";
import { Button } from "../Button";

export const StakeFooter = () => {
  const currentHeight = useBlockNumebr();

  return (
    <div className="w-full h-[153px]  bg-white">
      <div className="container flex flex-between h-full">
        <div>
          <AcaIcon className="w-[120px] h-[40px]" />
          <div className="flex items-center gap-32 mt-24">
            <a href="https://discord.gg/6QHVY4X" target="_blank">
              <DiscordIcon className="w-[36px]" />
            </a>
            <a href="https://linktr.ee/acalanetwork" target="_blank">
              <BookIcon />
            </a>
            <div className="flex items-center text-16 text-primary font-medium gap-12">
              <Link href={"/"}>Privacy</Link>
              <Spacing h={20} className="border-r border-d6d3de" />
              <Link href={"/"}>Terms</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-24">
          <div className="text-20 leading-[24px] text-494853 font-bold">Powered By Acala & Karura</div>
          <Button className="h-52 w-[193px] rounded-[42px] text-14 text-fff font-semibold" style={{background: "linear-gradient(328.08deg, #645AFF -40.69%, #E40C5B 36.17%, #FF4C3B 79.87%)"}}>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

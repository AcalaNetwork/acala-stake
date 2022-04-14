import React from "react";
import AcaIcon from "/public/images/acala-gray.svg";
import DiscordIcon from "/public/socials/discord-pink.svg";
import BookIcon from "/public/socials/book-pink.svg";
import Link from 'next/link';
import { useBlockNumebr } from "../../connector/hooks/useBlockNumber";

export const Footer = () => {
  const currentHeight = useBlockNumebr();

  return (
    <div className="w-full h-100  bg-white">
      <div className="container flex flex-between h-full">
        <AcaIcon className="w-[120px] h-[40px]" />
        <div className="flex flex-center text-16 text-grey-3 font-medium leading-20">
          <div className="pr-16 border-r border-solid border-d6d3de">
            Block: <a className='text-31c26b'
              href={`https://karura.subscan.io/block/${currentHeight}`}
              rel="noreferrer"
              target='_blank'> {`#${currentHeight}`}</a>
          </div>
          <div className="pl-16">
            <Link href='/terms'>Terms of Use</Link>
          </div>
          <a className="ml-[52px] mr-[32px]"
            href="https://discord.gg/6QHVY4X"
            rel="noreferrer"
            target='_blank'>
          	<DiscordIcon className="w-[36px]" />
          </a>
          <a href="https://linktr.ee/acalanetwork"
            rel="noreferrer"
            target='_blank'>
          	<BookIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

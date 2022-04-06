import { useState } from "react";
import { Button } from "../../../components/Button";
import { Spacing } from "../../../components/Spacing";
import Altonomy from "/public/trusted/altonomy.svg";
import Bentons from "/public/trusted/bentons.svg";
import CoinFund from "/public/trusted/CoinFund.svg";
import Hashkey from "/public/trusted/hashkey.svg";
import P2pcapital from "/public/trusted/p2pcapital.svg";
import Snz from "/public/trusted/snz.svg";
import Ventures from "/public/trusted/ventures.svg";
import Web3capital from "/public/trusted/web3capital.svg";

export const Trusted = () => {
  const [isAll, setIsAll] = useState<boolean>(false);
  const trusts = [
    <Altonomy />,
    <Bentons />,
    <CoinFund />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Web3capital />,
    <Altonomy />,
    <Bentons />,
    <CoinFund />,
    <Hashkey />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Altonomy />,
    <Bentons />,
    <CoinFund />,
    <Hashkey />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Web3capital />,
    <Altonomy />,
    <Bentons />,
    <CoinFund />,
    <Hashkey />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Web3capital />,
    <Altonomy />,
    <Bentons />,
    <Hashkey />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Web3capital />,
  ];
  return (
    <div className="bg-fff">
      <div className="container pt-56">
        <div className="text-[36px] leading-[44px] tracking-[0.04em] text-2e2d33 font-bold text-center">
          Trusted By
        </div>
        <div className="grid grid-cols-4">
          {trusts.slice(0, 8).map((item) => (
            <div className="flex flex-center h-[160px]">{item}</div>
          ))}
          {isAll && trusts.slice(8).map((item) => (
            <div className="flex flex-center h-[160px]">{item}</div>
          ))}
        </div>
        <Spacing h={20} />
        <div className="flex flex-center w-full mb-20">
          <Button
            variant="outline"
            onClick={() => setIsAll(!isAll)}
            className="rounded-[41px] w-[183px] font-normal h-56"
          >
            {isAll ? "VIEW LESS" : "VIEW ALL"}
          </Button>
        </div>
      </div>
    </div>
  );
};

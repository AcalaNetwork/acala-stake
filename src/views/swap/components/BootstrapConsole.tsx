import { Token } from "@acala-network/sdk-core";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { CircleProcess } from "../../../components/Process";
import { Table } from "../../../components/Table";
import { TokenImage } from "../../../components/TokenImage";

const TokenCard: FC<{ token: Token }> = ({ token }) => {
  return (
    <Card
      variant="border"
      shadow={1}
      className="rounded-[24px] mr-29 py-24 pl-[21px] pr-24 w-[280px]"
    >
      <div className="flex flex-between">
        <div className="text-20 leading-24 text-494853 font-medium pl-10">
          ACA-DOT
        </div>
        <TokenImage size={44} token={token} />
      </div>
      <div className="flex flex-between w-full pl-8 mt-38 mr-16">
        <div className="text-14 text-grey-3">The pool will start once</div>
        <CircleProcess process={55} />
      </div>
      <div className="w-full h-[142px] flex flex-between mt-32">
        <div className="h-full w-24 flex flex-col justify-between relative">
          <div className="w-24 h-24 bg-eae9f0 rounded-circle mt-9">
            {true && (
              <CheckIcon className="w-24 h-24 bg-31c26b rounded-circle text-white z-10 relative" />
            )}
          </div>
          <div className="w-24 h-24 bg-eae9f0 rounded-circle"></div>
          <div className="w-1 border-l border-dotted border-eae9f0 absolute left-12 top-24 bottom-0"></div>
        </div>
        <div className="flex-1 ml-16">
          <div className="text-14 leading-17 text-494853 font-medium max-w-[150px]">
            Liquidity Target met 10 DOT or 10,000 ACA
          </div>
          <div className="w-full h-12 bg-eae9f0 rounded-[7.5px] my-8 relative">
            <div
              className="absolute bg-primary h-12 top-0 left-0 rounded-[7.5px]"
              style={{ width: `${55}%` }}
            ></div>
          </div>
          <div className="text-16 leading-20 text-primary font-medium">55%</div>
          <div className="text-14 leading-17 text-494853 font-medium mt-20 mb-2">
            And after 8 Junly 2021
          </div>
        </div>
      </div>
      <div className=" mt-26 border border-d6d3de rounded-[24px] py-12 flex flex-col flex-center text-14 leading-17">
        <div className=" text-494853">Current Ratio</div>
        <div className="mt-8 mb-10 text-2e2d33 font-semibold">
          1 ACA : 0.0212 DOT
        </div>
        <div className="text-2e2d33 font-semibold">
          1 ACA : <span className="text-primary">≈ $4.1</span>
        </div>
      </div>
      <div className="mt-16">
        <Button size="sm" className="w-full">
          <Link href={`/swap/bootstrap/${encodeURIComponent(token.name)}`}>Bootstrap</Link>
        </Button>
      </div>
    </Card>
  );
};

const PoolsTable = () => {
  const [data, setData] = useState([
    {
      pools: "KAR-KSM",
      status: "ENABLED",
      ratio: "1 DOT : 800 ACA",
      contribution: "1DOT",
      per: "1%",
      share: "2.5KAR + 2.5KSM+",
    },
    {
      pools: "KAR-KSM",
      status: "PROVISIONING",
      ratio: "1 DOT : 800 ACA",
      contribution: "1DOT",
      per: "1%",
      share: "2.5KAR + 2.5KSM+",
    },
  ]);

  const columns = [
    {
      Header: "Liquidity Pools",
      accessor: "pools",
      Cell: (props: any) => (
        <div className="flex items-center text-2e2d33 text-14">
          {props.value}
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props: any) => (
        <div className="flex items-center">
          {props.value === "ENABLED" && (
            <div className="h-32 w-126 border border-[#61C288] text-[#61C288] text-12 flex flex-center font-medium rounded-[18.5px] bg-[#61C288] bg-opacity-10">
              ENABLED
            </div>
          )}
          {props.value === "PROVISIONING" && (
            <div className="h-32 w-126 border border-[#ff8800] text-[#ff8800] text-12 flex flex-center font-medium rounded-[18.5px] bg-[#ff8800] bg-opacity-10">
              PROVISIONING
            </div>
          )}
        </div>
      ),
    },
    {
      Header: "Current Ratio",
      accessor: "ratio",
      Cell: (props: any) => (
        <div className="flex items-center text-2e2d33 text-14 font-medium">
          {props.value}
        </div>
      ),
    },
    {
      Header: () => (
        <div className="flex w-full justify-end">My Contribution</div>
      ),
      accessor: "contribution",
      Cell: (props: any) => (
        <div className="flex justify-end text-2e2d33 text-14 font-medium">
          {props.value}
        </div>
      ),
    },
    {
      Header: () => <div className="flex w-full flex-center">My LP Share</div>,
      accessor: "share",
      Cell: (props: any) => (
        <div className="flex items-center flex-col text-primary text-14 leading-17 font-medium">
          <div>{props.row.original.per}</div>
          <div>{props.value}</div>
        </div>
      ),
    },
  ];

  return (
    <Card className="pt-38" variant="border">
      <Table data={data} columns={columns} />
    </Card>
  );
};

export const BootstrapConsole = () => {
  const tokens = [
    Token.fromCurrencyName("lp://aca/dot"),
    Token.fromCurrencyName("lp://ausd/dot"),
  ];
  return (
    <div className="mt-36">
      <div className="flex justify-start">
        {tokens.map((token) => (
          <TokenCard token={token} />
        ))}
      </div>
      <div className="mt-34">
        <PoolsTable />
      </div>
      <div className="mt-32 flex flex-between">
        <Card className="flex flex-center flex-col py-30 w-[314px]">
          <div className="w-64 h-64 bg-gray-400 rounded-circle"></div>
          <div className="pt-22 pb-16 text-16 leading-20 font-semibold text-494853">Bootstrap</div>
          <div className="text-14 leading-20 text-grey-3 max-w-[253px] font-medium text-center tracking-[0.04em]">A new swap pool will start trading after bootstrap requirements are met to achieve better liquidity and rate discovery.</div>
        </Card>
        <Card className="flex flex-center flex-col py-30 w-[314px]">
          <div className="w-64 h-64 bg-gray-400 rounded-circle"></div>
          <div className="pt-22 pb-16 text-16 leading-20 font-semibold text-494853">Add Liquidity</div>
          <div className="text-14 leading-20 text-grey-3 max-w-[253px] font-medium text-center tracking-[0.04em]">A new swap pool will start trading after bootstrap requirements are met to achieve better liquidity and rate discovery.</div>
        </Card>
        <Card className="flex flex-center flex-col py-30 w-[314px]">
          <div className="w-64 h-64 bg-gray-400 rounded-circle"></div>
          <div className="pt-22 pb-16 text-16 leading-20 font-semibold text-494853">Bootstrap</div>
          <div className="text-14 leading-20 text-grey-3 max-w-[253px] font-medium text-center tracking-[0.04em]">A new swap pool will start trading after bootstrap requirements are met to achieve better liquidity and rate discovery.</div>
        </Card>
      </div>
    </div>
  );
};

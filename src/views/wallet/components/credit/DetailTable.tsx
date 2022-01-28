import { useState } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { Table } from "../../../../components/Table";
import { TokenImage } from "../../../../components/TokenImage";
import { TokenName } from "../../../../components/TokenName";
import { formatNumber } from "../../../../utils/formatNumber";

export const DetailTable = () => {
  const [data, setData] = useState([
    {
      owner: '',
      token: "LDOT",
      available: 50020.0,
      apy: 13,
      owing: 0,
    },
  ]);

  const columns = [
    {
      Header: "COLLATERALS",
      accessor: "token",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-14">
          <TokenImage size="sm" token={props.value} />
          <TokenName className="mx-8" token={props.value} />
        </div>
      ),
    },
    {
      Header: "AVAILABLE CREDIT",
      accessor: "available",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {`$${formatNumber(props.value)}`}
        </div>
      ),
    },
    {
      Header: "NET APY",
      accessor: "apy",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16">
          {`${props.value}%`}
        </div>
      ),
    },
    {
      Header: "OWING",
      accessor: "owing",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16">
          {`$${formatNumber(props.value)}`}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "owner",
      Cell: (props: any) => (
        <div className="">
          <Button className="text-14" size='sm' variant="text">Borrow</Button>
          <Button className="text-14" size='sm' variant="text">Replay</Button>
        </div>
      ),
    },
  ];
  return <Card className="pt-[18px] px-28">
    <Table columns={columns} data={data} />
  </Card>;
};

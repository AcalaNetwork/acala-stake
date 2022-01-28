import { useState } from "react"
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card"
import { Table } from "../../../../components/Table"
import { TokenImage } from "../../../../components/TokenImage";
import { TokenName } from "../../../../components/TokenName";
import { formatNumber } from "../../../../utils/formatNumber";

export const CollateralCard = () => {
  const [data, setData] = useState([
    {
      id: 1,
      token: 'LDOT',
      price: 45,
      apy: 13,
      ratio: 120
    },
    {
      id: 2,
      token: 'LDOT',
      price: 43,
      apy: 14,
      ratio: 140
    },
    {
      id: 3,
      token: 'LDOT',
      price: 46,
      apy: 15,
      ratio: 150
    }
  ]);

  const columns = [
    {
      Header: "ASSET",
      accessor: "token",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-14">
          <TokenImage size='sm' token={props.value} />
          <TokenName className="mx-8" token={props.value} />
        </div>
      ),
    },
    {
      Header: "PRICE",
      accessor: "price",
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
          {`${formatNumber(props.value)}%`}
        </div>
      ),
    },
    {
      Header: () => (
        <div className="w-full justify-end text-right">
          <p>REQUIRED<br/>COLLATERAL RATIO</p>
        </div>
      ),
      accessor: "ratio",
      Cell: (props: any) => (
        <div className="flex items-center justify-end text-right text-494853 text-16">
          {`${formatNumber(props.value)}%`}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "id",
      Cell: () => (
        <div className="flex items-between w-full">
          <Button className="flex-1" size="sm" variant="text">Mint</Button>
          <Button className="flex-1" size="sm" variant="text">Repay</Button>
        </div>
      ),
    },
  ];

  return <Card variant='gradient-border' className="pt-[19px] pb-12">
    <Table data={data} columns={columns}/>
  </Card>
}
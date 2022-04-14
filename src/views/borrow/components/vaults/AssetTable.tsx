import Link from "next/link"
import { useState } from "react"
import { Button } from "../../../../components/Button"
import { Card } from "../../../../components/Card"
import { Table } from "../../../../components/Table"
import { TokenImage } from "../../../../components/TokenImage"
import { TokenName } from "../../../../components/TokenName"
import { formatNumber } from "../../../../utils/formatNumber"
import { getTokenFullName } from "../../../../utils/token"

export const AssetTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      token: 'LDOT',
      ratio: 120,
      currentRatio: 0.00002,
      value: 100300.22,
      debit: 10300.22
    }
  ])

  const columns = [
    {
      Header: "ASSET",
      accessor: "token",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853">
          <TokenImage size="sm" token={props.value} />
          <div className="mx-8 text-14 text-494853">{props.value}</div>
          <span className="text-12 font-medium text-grey-3">({getTokenFullName(props.value)})</span>
        </div>
      ),
    },
    {
      Header: () => (
        <div>
          <div>REQUIRED</div>
          <div>COLLATERAL RATIO</div>
        </div>
      ),
      accessor: "ratio",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-14 font-medium">
          {`${props.value}%`}
        </div>
      ),
    },
    {
      Header: "CURRENT RATIO",
      accessor: "currentRatio",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-medium">
          {`${props.value}%`}
        </div>
      ),
    },
    {
      Header: "COLLATERAL VALUE",
      accessor: "value",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {`$${formatNumber(props.value)}`}
        </div>
      ),
    },
    {
      Header: "aUSD DEBIT",
      accessor: "debit",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {formatNumber(props.value)}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "id",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex flex-between">
          <Button className="text-14 px-0" variant="text" size="sm">
            <Link href={`/borrow/vaults/${props.row.original.token}`}>Borrow</Link>
          </Button>
          <Button className="text-14 px-0" variant="text" size="sm">Repay</Button>
        </div>
      ),
    },
  ];
  return <Card className=" pt-17 px-24 pb-12">
    <Table  data={data} columns={columns}/>
  </Card>
}
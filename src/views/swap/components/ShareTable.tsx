import { FC, useMemo } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { FormatRatio } from "../../../components/FormatRatio";
import { Table } from "../../../components/Table";
import { formatNumber } from "../../../utils/formatNumber";
import { getTokenName } from "../../../utils/token";
import { useShareForm } from "../hooks/useShareForm";

export const ShareTable: FC<{ tab: "USD" | "TOKEN" }> = ({ tab }) => {
  const [_, pools] = useShareForm();

  const columns = useMemo(() => [
    {
      Header: "LP SHARE",
      accessor: "token",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-14">
          {getTokenName(props.value)}
        </div>
      ),
    },
    {
      Header: "CUR. YIELD",
      accessor: "cur",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-14 font-medium">
          {props.value}
        </div>
      ),
    },
    {
      Header: "POOL SHARE",
      accessor: "ratio",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-medium">
          {FormatRatio(props.value)}
        </div>
      ),
    },
    {
      Header: tab === 'USD' ? 'VALUE' : "AMOUNT",
      accessor: tab === 'USD' ? 'value' : "share",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {formatNumber(props.value)}
        </div>
      ),
    },
    {
      Header: "REWARD TOKEN",
      accessor: "reward",
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {props.value}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "id",
      Cell: (props: any) => (
        <div className="flex flex-between text-494853 text-14">
          <Button variant="text" size="sm">
            Add
          </Button>
          <Button variant="text" size="sm">
            Withdraw
          </Button>
          <Button variant="text" size="sm">
            Claim
          </Button>
        </div>
      ),
    },
  ], [tab]);

  return (
    <Card className="pt-32">
      <Table data={pools} columns={columns} />
    </Card>
  );
};

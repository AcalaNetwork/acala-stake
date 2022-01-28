import Link from "next/link";
import React, { useState } from "react";
import { Card } from "../../../../components/Card";
import { Table } from "../../../../components/Table";

export const TransactionHistory = () => {
  const [data, setData] = useState([
    {
      transaction: "Send 0.1 KAR to tNPyBJ...tNPyBJ",
      time: "2021/11/23 03:29(+UTC)",
      id: 1,
    },
    {
      transaction: "Send 0.1 KAR to tNPyBJ...tNPyBJ",
      time: "2021/11/23 03:29(+UTC)",
      id: 2,
    },
  ]);

  const columns = [
    {
      Header: "Transaction History",
      accessor: "transaction",
      Cell: (props: any) => (
        <div className="text-494853 leading-17 text-14 font-medium">
          {props.value}
        </div>
      ),
    },
    {
      Header: "Time",
      accessor: "time",
      Cell: (props: any) => (
        <div className="text-7b7986 text-14 leading-17 font-medium">
          {props.value}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "id",
      disableSortBy: true,
      Cell: (props: any) => (
        <Link href="http://baidu.com">
          <div className="text-right w-full text-primary leading-17 text-14 font-medium">
            View on Subscan
          </div>
        </Link>
      ),
    },
  ];

  return (
    <Card className="bg-white rounded-[24px] pt-24 pb-10">
      <Table
        data={data}
        columns={columns}
      />
    </Card>
  );
};

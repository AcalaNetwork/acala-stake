import { Card } from "../../../../components/Card";
import { Table } from "../../../../components/Table";

export const DetailTable = () => {
  const data = [
    {
      token: "DOT",
      aggregated: {
        price: 249,
        timestep: "2minutes age",
      },
      acala: {
        price: 249,
        timestep: "2minutes age",
      },
    },
  ];
  const columns = [
    {
      Header: () => <div className="w-[400px] h-1"></div>,
      accessor: "token",
      disableSortBy: true,
      Cell: (props: any) => (
        <div className="flex items-center text-494853 text-16 font-semibold">
          {props.value}
        </div>
      ),
    },
    {
      Header: "AGGREGATED",
      accessor: "aggregated",
      Cell: (props: any) => (
        <div className="text-494853 text-14 flex flex-col items-start mt-20">
          <div className="text-14 leading-20 text-primary font-medium bg-f1f0f2 h-20 rounded-[10px] px-15">{`$${props.value.price}`}</div>
          <div className="mt-4 text-14 leading-17 font-medium text-[#b1b0bc]">{props.value.timestep}</div>
        </div>
      ),
    },
    {
      Header: "ACALA",
      accessor: "acala",
      Cell: (props: any) => (
        <div className="text-494853 text-14 flex flex-col items-start mt-20">
          <div className="h-20 text-14 leading-17 text-primary font-medium bg-f1f0f2 rounded-[10px] px-15">{`$${props.value.price}`}</div>
          <div className="mt-4 text-14 leading-17 font-medium text-[#b1b0bc]">{props.value.timestep}</div>
        </div>
      ),
    },
  ];
  return (
    <>
    <div className="text-20 leading-[24px] text-494853 font-medium">Detail</div>
      <Card className="mt-24 pb-22 px-32 pt-20">
        <Table data={data} columns={columns} />
      </Card>
    </>
  );
};

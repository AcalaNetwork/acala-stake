import {
	ChevronUpIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";
import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Loading } from "./Loading";

type TABLE_SIZE = "default" | "lg";

const PADDING_CONFIGS: Record<TABLE_SIZE, string> = {
	default: "px-52",
	lg: "px-88",
};

export interface TableProps {
	columns: any[];
	data?: any[];
	size?: TABLE_SIZE;
	loading?: boolean;
	pagination?: {
		defaultSize?: number;
		defaultIndex?: number;
	};
	defaultSortBy?: {
		columnId: string;
		desc: boolean;
	};
}

export const Table = ({
	columns,
	data,
	size = "default",
	pagination = {},
	defaultSortBy,
	loading,
}: TableProps) => {
	const {
		canNextPage,
		canPreviousPage,
		getTableBodyProps,
		// rows,
		getTableProps,
		headerGroups,
		nextPage,
		page,
		prepareRow,
		previousPage,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: data || [],
			initialState: {
				pageSize: pagination?.defaultSize || 20,
				pageIndex: pagination?.defaultIndex || 0,
				sortBy: defaultSortBy
					? [
							{
								id: defaultSortBy.columnId,
								desc: defaultSortBy.desc,
							},
					  ]
					: [],
			},
		},
		useSortBy,
		usePagination
	);

	const tableProps = getTableProps();
	const rootClassName = `select-none ${PADDING_CONFIGS[size]}`;
	const headerClassName = "text-12 leading-15 text-7b7986 font-semibold";
	const headerItemClassName = "px-16 border-b border-eae9f0 pb-16 first:pl-0 last:pr-0";
	const itemClassName = "p-16 border-b border-eae9fo first:pl-0 last:pr-0";

	return (
		<div className={rootClassName}>
			<table {...tableProps} className={`${tableProps.className} w-full`}>
				<thead>
					{headerGroups.map((headerGroup, i) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							className={headerClassName}
						>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={headerItemClassName}
								>
									<div className="flex items-center">
										{column.render("Header")}
										{column.isSorted ? (
											column.isSortedDesc ? (
												<ChevronDownIcon className="my-0 mx-4 w-12 h-12" />
											) : (
												<ChevronUpIcon className="my-0 mx-4 w-12 h-12" />
											)
										) : (
											<div className="mx-4 w-12 h-12"></div>
										)}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				{page && page.length ? (
					<tbody {...getTableBodyProps()}>
						{page.map((row, rowIndex) => {
              const noBorder = rowIndex === page.length - 1;

							prepareRow(row);

							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()} className={itemClassName} style={{ border: noBorder ? 'none' : '' }}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			{data && data.length && data.length > pageSize ? (
				<div className="flex flex-center m-16 gap-10">
					<ChevronLeftIcon
						onClick={previousPage}
						cursor={canPreviousPage ? 'normal' : 'pointer'}
						color={canPreviousPage ? "#828282" : "#f2f2f2"}
						className="w-14 h-14"
					/>
					<p>
						{pageIndex + 1} / {Math.ceil(data.length / pageSize)}
					</p>
					<ChevronRightIcon
						onClick={nextPage}
						cursor={canPreviousPage ? 'normal' : 'pointer'}
						color={canNextPage ? "#828282" : "#f2f2f2"}
						className="w-14 h-14"
					/>
				</div>
			) : null}
			{loading ? <TableLoading /> : null}
		</div>
	);
};

const TableLoading = React.memo(() => {
	return (
		<div className="flex items-center justify-center min-h-[360px]">
			<Loading />
		</div>
	);
});

import React, { FC } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "../Dropdown";
import { memo } from "react";

type MenuItem = PropsWithChildren<{
  link:
    | string
    | {
        path: string;
        label: string;
      }[];
  activeParams?: string[];
}>;

const MenuItem: FC<MenuItem> = memo(({ children, link, activeParams }) => {
  const { asPath } = useRouter();
  const baseClassName =
    "pt-8 pb-8 pl-36 pr-36 rounded-12 text-base font-medium";
  const activeClassName = "bg-eae9f0 text-494853";
  const isActive = activeParams.includes(asPath);
  const className = `${baseClassName} ${
    isActive ? activeClassName : "text-7b7986"
  }`;

  return (
    <li className={className}>
      {typeof link === "string" ? (
        <Link href={link}>
          <a>{children}</a>
        </Link>
      ) : (
        <Dropdown
          childItems={link.map((item) => (
            <div className={`w-100 border-b border-gray-300 text-center py-4 text-14`}
              key={item.path}>
              <Link href={item.path}>
                <a className={asPath === item.path ? 'text-494853' : 'text-7b7986'}>{item.label}</a>
              </Link>
            </div>
          ))}
          content={<div className={`text-7b7986 font-medium`}>{children}</div>}
        />
      )}
    </li>
  );
});

export const Menu = memo(() => {
  return (
    <ul className="flex flex-row">
      <MenuItem activeParams={["/stake"]}
        link="/stake">
        Home
      </MenuItem>
      <MenuItem
        activeParams={["/stake/what-is-staking"]}
        link="/stake/what-is-staking"
      >
        What is Staking
      </MenuItem>
      <MenuItem
        activeParams={["/stake/dot", "/stake/ksm"]}
        link={[
          { path: "/stake/dot", label: "Stake DOT" },
          { path: "/stake/ksm", label: "Stake KSM" },
        ]}
      >
        Stake
      </MenuItem>
      <MenuItem activeParams={["/stake/bridge"]}
        link="/stake/bridge">
        Bridge
      </MenuItem>
      <MenuItem activeParams={["/stake/community"]}
        link="/stake/community">
        Community
      </MenuItem>
    </ul>
  );
});

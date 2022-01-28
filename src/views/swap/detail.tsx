import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC } from "react";
import { Layout } from "../../components/layout";
import { BootstrapDetail } from "./components/BootstrapDetail";
import { BootstrapOverview } from "./components/BootstrapOverview";
import { SwapSubPageTabs } from "./components/SwapSubPageTabs";

export const Detail: FC<{ token: string }> = ({ token }) => {
  return (
    <Layout>
      <BootstrapOverview />
      <SwapSubPageTabs active={2} />
      <div className="container">
        <div className="mt-40 text-abaab9">
          <Link href={"/swap/bootstrap"}>
            <ArrowLeftIcon className="w-26 h-26 cursor-pointer" />
          </Link>
        </div>
        <div className="mt-34">
          <BootstrapDetail token={token} />
        </div>
      </div>
    </Layout>
  );
};

import { Layout } from "../../components/layout";
import { BootstrapConsole } from "./components/BootstrapConsole";
import { SwapSubPageTabs } from "./components/SwapSubPageTabs";

export const Bootstrap = () => {
  return (
    <Layout>
      <SwapSubPageTabs active={2} />
      <div className="container">
        <BootstrapConsole />
      </div>
    </Layout>
  );
};

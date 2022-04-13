import { useRouter } from "next/router";
import { FC, useContext } from "react";
import {
  StakeProvider,
  StakeProviderContext,
} from "../../../views/stake/components/stake/StakeContext";
import { Stake } from "../../../views/stake/Stake";

const Inner = ({ children }) => {
  const { setActiveToken, activeToken } = useContext(StakeProviderContext);
  const router = useRouter();
  const token = typeof router.query.token === 'object'? router.query.token[0] : router.query.token;

  if (["DOT", "dot", "KSM", "ksm"].includes(token)) {
    token.toLocaleUpperCase() != activeToken && setActiveToken(
      token.toLocaleUpperCase() as unknown as "DOT" | "KSM"
    );
  }

  return children;
};

export const SetTokenCom: FC = ({ children }) => {
  return (
    <StakeProvider>
      <Inner>{children}</Inner>
    </StakeProvider>
  );
};

const StakePage = () => {
  return (
    <SetTokenCom>
      <Stake />
    </SetTokenCom>
  );
};

export default StakePage;

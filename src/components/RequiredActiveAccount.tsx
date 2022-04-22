import { Card } from "@components";
import { useActiveAccount } from "@connector";
import clsx from "clsx";
import { memo } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { BaseComponentProps } from "./types";

type RequiredActiveAccount = BaseComponentProps;

export const RequiredActiveAccount = memo<RequiredActiveAccount>(({ className, children }) => {
  const active = useActiveAccount();

  if (active) return <>{children}</>;

  return (
    <Card className={clsx("flex items-center justify-center", className)} variant='gradient-border'>
      <ConnectWalletButton />
    </Card>
  );

});
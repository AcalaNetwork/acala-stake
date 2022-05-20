import { ModalType, useModal } from "@state";
import { getHelperLink } from "@utils";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { Button } from "./Button";
import { BaseComponentProps } from "./types";

export const ConnectWalletButton = memo<BaseComponentProps>(({ className }) => {
  const walletGuide = getHelperLink('connect-wallet');
  const { open } = useModal(ModalType.ConnectExtension);

  return (
    <div className={clsx('flex flex-col gap-16 items-center', className)}>
      <Button className='w-full h-48 text-16' onClick={open}
        size='sm'>
        Connect Wallet
      </Button>
      <div className='text-14 leading-17 font-medium text-grey-3'>
        Read more on wallet guide{' '}
        <Link href={walletGuide} passHref>
          <span className='text-primary border-b border-primary cursor-pointer'>Here</span>
        </Link>
        .
      </div>
    </div>
  );
});
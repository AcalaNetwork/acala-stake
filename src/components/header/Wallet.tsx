import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";
import { useExtension } from "../../connector/hooks/useExtension";
import { useSS58 } from "../../connector/hooks/useSS58";
import { ConnectStatus } from "../../connector/types";
import { useOpenModal } from "../../state";
import { ModalType } from "../../state/application/types";
import { Address } from "../Address";
import { AddressAvatar } from "../AddressAvatar";

interface WalletProps {
	className?: string;
	isConnected?: boolean;
	isStake?: boolean
}

const ConnectBtn: FC<{ className: string }> = ({ className }) => {
	const openModal = useOpenModal(ModalType.ConnectExtension);

	return (
		<div
			className={`whitespace-nowrap font-medium text-base text-primary ${className} pt-8 pb-8 pl-16 pr-16 `}
			onClick={openModal}
		>
			Connect to a wallet
		</div>
	);
};

const Connected: FC<Omit<WalletProps, "isConnected">> = ({ className, isStake }) => {
	const ss58 = useSS58();
	const { active } = useExtension();
	const openSelectAccountModal = useOpenModal(ModalType.selectAccount);
	const router = useRouter();

	const toWalletPage = useCallback(() => router.push(isStake ? "/stake/wallet" : "/wallet"), [router]);

	return (
		<div className={`flex items-stretch font-medium ${className}`}>
			<div
				className="flex-center text-16 leading-20 pl-16 pr-8 py-8 text-primary border-r-2 border-eae9f0 underline"
				onClick={toWalletPage}
			>
				Wallet
			</div>
			<div
				className="flex-center text-16 text-494853 leading-17 pl-8 pr-16 py-8"
				onClick={openSelectAccountModal}
			>
				<Address
					address={active?.address || ""}
					name={active?.name}
					ss58={ss58}
					className="w-[100px] overflow-hidden overflow-ellipsis"
				/>
				<AddressAvatar address={active?.address || ""} />
			</div>
		</div>
	);
};

export const Wallet: FC<WalletProps> = ({ className }) => {
	const rootClassName = `cursor-pointer h-38 bg-f1f0f2 rounded-12 border border-eae9f0 ${className}`;
	const extension = useExtension();
	const isConnected = extension.status === ConnectStatus.ready;

	if (isConnected) {
		return <Connected className={rootClassName} />;
	}

	return <ConnectBtn className={rootClassName} />;
};

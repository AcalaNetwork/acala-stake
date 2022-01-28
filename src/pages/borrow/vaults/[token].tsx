import { useRouter } from "next/router";
import React from "react";
import { TokenVault } from "../../../views/borrow/token";

export default function VaultsTokenPage() {
	const router = useRouter();
	const {token} = router.query;
	return <TokenVault token={token as string} />;
}

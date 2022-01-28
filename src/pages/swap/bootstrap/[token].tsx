import { useRouter } from "next/router";
import React from "react";
import { Detail } from "../../../views/swap/detail";

export default function BootstrapDetailPage() {
  const router = useRouter();
  const { token } = router.query;
  return <Detail token={token as string} />;
}

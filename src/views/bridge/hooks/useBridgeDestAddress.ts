import { RegisteredChain } from "@acala-network/sdk/cross-chain/configs/chains";
import { AddressInputSelectorProps } from "@components";
import { useExtension } from "@connector";
import { useBoolean } from "@hooks";
import { encodeAddress } from "@polkadot/keyring";
import { useCrossChain } from "@sdk/hooks/crosschain/useCrossChain";
import { useMemo, useState } from "react";

interface UseBridgeDestAddressConfigs {
  init?: string;
  toChain: RegisteredChain;
}

export const useBridgeDestAddress = ({ init, toChain }: UseBridgeDestAddressConfigs): AddressInputSelectorProps & { name?: string }=> {
  const crossChain = useCrossChain();
  const [dest, setDest] = useState<string | undefined>(init);
  const { value: locked, setFalse: setUnlock } = useBoolean(true);
  const { injectedAccounts } = useExtension();

  return useMemo(() => {
    let ss58 = 42;

    try {
      ss58 = crossChain.findAdapter(toChain).getSS58Prefix();
    } catch (e) {
      // ingore error
    }

    const currentAddres = injectedAccounts.find((item) => {
      return encodeAddress(item.address, 42) === encodeAddress(dest, 42);
    });

    return {
      addresses: injectedAccounts.map((item) => ({
        name: item.name,
        value: item.address
      })),
      ss58: ss58,
      disabled: locked,
      value: dest,
      onChange: setDest,
      name: currentAddres.name
    };
  }, [crossChain, dest, injectedAccounts, locked, toChain]);
};

export type BridgeDestAddress = ReturnType<typeof useBridgeDestAddress>; 
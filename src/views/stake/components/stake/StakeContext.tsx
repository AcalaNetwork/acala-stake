import { FixedPointNumber, forceToCurrencyId, Token } from "@acala-network/sdk-core";
import { EstimateMintResult } from "@acala-network/sdk/homa/types";
import React, {
  FC,
  useCallback,
  useState,
  createContext,
  useMemo,
  useEffect,
} from "react";
import { ChainData } from "@components/form";
import { useApi } from "../../../../connector";
import { usePresetTokens } from "../../../../connector/hooks/usePresetTokens";
import { useSubscription } from "../../../../hooks/useSubscription";
import { useHoma, useHomaEnv } from "../../../../sdk/hooks/homa";
import { eliminateGap } from "../../../../utils/eliminateGap";
import { useStakeBalance } from "../../hook/useStakeBalance";

type IWalletStep = "wallet-overview" | "wallet-create" | "wallet-confirm";
type IStakeStep = "stake-create" | "stake-confirm" | "stake-result";
type IStep = IWalletStep | IStakeStep;

interface StakeContextProps {
  apy: number;
  step: IStep;
  setStep: (step: IStep) => void;
  connect: boolean;
  setConnect: (value: boolean) => void;
  activeToken: "DOT" | "KSM";
  setActiveToken: (value: "DOT" | "KSM") => void;
  prePage: IStep;
  setPrePage: (value: IStep) => void;
  bridgeAmount: string;
  setBridgeAmount: (val: string) => void;
  stakeAmount: string;
  setStakeAmount: (val: string) => void;
  mintAmount: EstimateMintResult;
  fromChains: ChainData[];
  toChains: ChainData[];
  selectFromChain: ChainData;
  selectToChain: ChainData;
  tokenBalance: {
    stakingToken: FixedPointNumber;
    liquidToken: FixedPointNumber;
  };
  available: FixedPointNumber;
  liquidToken: Token;
  stakingToken: Token;
  params: any,
  collateralize: boolean;
  setCollateralize: (value: boolean) => void;
  nativeToken: Token;
}

export const StakeProviderContext = createContext<StakeContextProps>(
  {} as StakeContextProps
);

export const StakeProvider: FC = ({ children }) => {
  const { api } = useApi();
  const [step, _setStep] = useState<IStep>("wallet-overview");
  const [connect, _setConnect] = useState<boolean>(true);
  const [activeToken, _setActiveToken] = useState<"DOT" | "KSM">();
  const network = useMemo(
    () => (activeToken === "KSM" ? "karura" : "acala"),
    [activeToken]
  );
  const presetTokens = usePresetTokens(network);
  // 1: wallet-overview -> stake-create
  // 2: wallet-confirm -> stake-create
  const [prePage, _setPrePage] = useState<IStep>("wallet-overview");
  const [bridgeAmount, _setBridgeAmount] = useState<string>();
  const [stakeAmount, _setStakeAmount] = useState<string>();
  const [mintAmount, setMintAmount] = useState<EstimateMintResult>();
  const [collateralize, setCollateralize] = useState<boolean>(false);
  const { available, apy } = useStakeBalance(activeToken);
  const homaEnv = useHomaEnv(network);
  const homa = useHoma(network);
  const { liquidToken, stakingToken } = homa.consts;

  const [tokenBalance, setTokenBalance] = useState({
    stakingToken: FixedPointNumber.ZERO,
    liquidToken: FixedPointNumber.ZERO,
  });

  useEffect(() => {
    if (!homaEnv) return;

    setTokenBalance({
      stakingToken: homaEnv.totalStaking,
      liquidToken: homaEnv.totalLiquidity,
    });
  }, [homaEnv]);

  const fromChains: ChainData[] = [
    {
      chainName: "DOT",
      name: "Polkadot Network",
      parachainId: 1000,
    },
  ];
  const toChains: ChainData[] = [
    {
      chainName: "ACA",
      name: "Acala Network",
      parachainId: 10000,
    },
  ];

  const [selectFromChain, setSelectFromChain] = useState<ChainData>(
    fromChains[0]
  );
  const [selectToChain, setSelectToChain] = useState<ChainData>(toChains[0]);

  const setBridgeAmount = useCallback(
    (val: string) => _setBridgeAmount(val),
    [_setBridgeAmount]
  );
  const setStakeAmount = useCallback(
    (val: string) => _setStakeAmount(val),
    [_setStakeAmount]
  );

  const setStep = useCallback(
    (value: IStep) => {
      _setStep(value);
    },
    [_setStep]
  );

  const setConnect = useCallback(
    (value: boolean) => {
      _setConnect(value);
    },
    [_setConnect]
  );

  const setActiveToken = useCallback(
    (value: "DOT" | "KSM") => {
      _setActiveToken(value);
    },
    [_setActiveToken]
  );

  const setPrePage = useCallback(
    (value: IStep) => {
      _setPrePage(value);
    },
    [_setPrePage]
  );

  useSubscription(() => {
    if (!homa || !stakeAmount) return;

    return homa
      .subscribeEstimateMintResult(
        new FixedPointNumber(
          stakeAmount,
          stakingToken.decimals
        )
      )
      .subscribe({
        error: (err) => {
          console.log(err)
          setMintAmount(undefined);
        },
        next: setMintAmount,
      });
  }, [stakeAmount, homa]);

  const params = useMemo(() => {
    if (!tokenBalance.stakingToken) return;

    const mintCall = api.tx.homa.mint(
      eliminateGap(
        new FixedPointNumber(stakeAmount || 0, 12),
        tokenBalance.stakingToken
      ).toChainData()
    );

    if (collateralize) {
      return [[
        mintCall,
        api.tx.honzon.adjustLoan(
          forceToCurrencyId(api, liquidToken), (mintAmount?.receive.toChainData() || '0').replace(/\d{6}$/, '000000'), '0')
      ]]
    }

    return mintCall.args;
  }, [api, stakeAmount, collateralize, liquidToken, mintAmount, tokenBalance]);

  return (
    <StakeProviderContext.Provider
      value={{
        apy,
        step,
        setStep,
        connect,
        setConnect,
        activeToken,
        setActiveToken,
        prePage,
        setPrePage,
        bridgeAmount,
        setBridgeAmount,
        stakeAmount,
        setStakeAmount,
        fromChains,
        toChains,
        selectFromChain,
        selectToChain,
        tokenBalance,
        available,
        liquidToken,
        stakingToken,
        mintAmount,
        params,
        collateralize,
        setCollateralize,
        nativeToken: presetTokens?.nativeToken
      }}
    >
      {children}
    </StakeProviderContext.Provider>
  );
};

export const StakeConsumer = StakeProviderContext.Consumer;

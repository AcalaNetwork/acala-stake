import { Token, unzipDexShareName } from "@acala-network/sdk-core";
import { RadioGroup } from "@headlessui/react";
import { FC, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { BalanceCurrencyInput } from "../../../components/form";
import { TokenImage } from "../../../components/TokenImage";
import DeadlineIcon from "/public/icons/deadline.svg";

export const BootstrapDetail: FC<{ token: string }> = ({ token }) => {
  const [type, setType] = useState(1);

  const [token1, token2] = unzipDexShareName(token);
  return (
    <div className="flex items-start justify-center mt-34">
      <div className="w-[626px] mr-28">
        <Card className="w-full pt-24 pb-28 flex flex-center flex-col px-68 font-medium">
          <div className="text-20 leading-[24px] text-2e2d33">
            My Liquidity Porvision
          </div>
          <div className="flex flex-between w-full mt-24 text-center">
            <div>
              <div className="text-14 leading-17 text-7b7986">
                Liquidity Provided
              </div>
              <div className="text-20 leading-[24px] text-2e2d33 mt-18">
                10 KAR + 2KSM{" "}
              </div>
            </div>
            <div>
              <div className="text-14 leading-17 text-7b7986">
                Est. LP Share
              </div>
              <div className="text-20 leading-[24px] text-2e2d33 mt-18">
                48%
              </div>
            </div>
            <div>
              <div className="text-14 leading-17 text-7b7986">
                Est. LP Token
              </div>
              <div className="text-20 leading-[24px] text-2e2d33 mt-18">
                1000
              </div>
            </div>
          </div>
        </Card>
        <Card className="py-36 px-72 mt-28">
          <div className="flex flex-center text-20 text-7b7986 font-medium">
            Provide Liquidity to Bootstrap KAR-KSM
            <TokenImage className="ml-6" size={28} token={token} />
          </div>
          <div className="flex flex-between mt-40 text-16 text-494853 w-[404px] mx-auto">
            <RadioGroup
              value={type}
              onChange={setType}
              className="flex flex-between w-full"
            >
              <RadioGroup.Option value={1}>
                {({ checked }) => (
                  <div
                    className={`cursor-pointer flex flex-center w-100 h-36 border rounded-8 bg-eae9f0 ${
                      checked ? "border-primary" : "border-eae0f0"
                    }`}
                  >
                    <span className="ml-8 text-16 text-494853">
                      Add {token1}
                    </span>
                  </div>
                )}
              </RadioGroup.Option>
              OR
              <RadioGroup.Option value={2}>
                {({ checked }) => (
                  <div
                    className={`cursor-pointer flex flex-center w-100 h-36 border rounded-8 bg-eae9f0 ${
                      checked ? "border-primary" : "border-eae0f0"
                    }`}
                  >
                    <span className="ml-8 text-16 text-494853">
                      Add {token2}
                    </span>
                  </div>
                )}
              </RadioGroup.Option>
              OR
              <RadioGroup.Option value={3}>
                {({ checked }) => (
                  <div
                    className={`cursor-pointer flex flex-center w-100 h-36 border rounded-8 bg-eae9f0 ${
                      checked ? "border-primary" : "border-eae0f0"
                    }`}
                  >
                    <span className="ml-8 text-16 text-494853">Add Both</span>
                  </div>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>
          <div className="mt-8">
            {type !== 2 && (
              <div className="mt-40">
                <div>
                  <BalanceCurrencyInput value={{ token: Token.fromCurrencyName(token1), amount: 123 }} />
                </div>
                <div className="mt-8 w-full text-right text-14 leading-17 text-494853">
                  min: 0.0001{token1}
                </div>
              </div>
            )}
            {type !== 1 && (
              <div className="mt-40">
                <div>
                  <BalanceCurrencyInput value={{ token: Token.fromCurrencyName(token2), amount: 123 }} />
                </div>
                <div className="mt-8 w-full text-right text-14 leading-17 text-494853">
                  min: 0.0001{token2}
                </div>
              </div>
            )}
          </div>
          <div className="mt-30 border border-d6d3de rounded-[24px] py-10 text-14 leading-17 flex flex-center flex-col">
            <p className=" text-7b7986 font-medium">
              Exchange Ratio after provision
            </p>
            <p className="text-494853 font-semibold my-8">1 ACA : 0.0212 DOT</p>
            <p className="text-494853 font-semibold">
              1 ACA : <span className="text-primary">≈ $1.5</span>
            </p>
            <p className="text-e40c5b mt-8">
              Warning: ACA rate will be lower than the current ratio
            </p>
          </div>
          <div className="mt-34 w-full font-medium">
            <div className="flex flex-between">
              <div className="text-14 leading-17 text-7b7986">
                To receive LP shares with current ratio:
              </div>
              <div className="text-16 leading-20 text-494853">48.2%</div>
            </div>
            <div className="flex flex-between mt-9">
              <div className="text-14 leading-17 text-7b7986 font-medium">
                To receive LP tokens with current ratio:
              </div>
              <div className="text-16 leading-20 text-494853">1001</div>
            </div>
          </div>
          <div className="w-full text-14 leading-20 text-7b7986 bg-eae9f0 mt-20 rounded-8 px-20 py-5">
            Note: The actual LP shares will be determined when the program ends.
          </div>
          <div className="flex flex-center mt-22">
            <Button className="w-[320px]">Bootstrap</Button>
          </div>
        </Card>
      </div>
      <Card className="w-[346px] px-36 py-36 flex flex-center flex-col">
        <div className="flex flex-center text-14 text-2e2d33 font-medium">
          <DeadlineIcon />
          <div className="ml-34">2d : 22h: 33m</div>
        </div>
        <div className="w-[242px] border border-d6d3de rounded-[24px] pt-11 pb-14 mt-32 text-14 leading-17 flex flex-center flex-col">
          <div className=" text-abaab9 font-medium">Current Ratio</div>
          <div className="mt-8 mb-10 text-2e2d33 font-semibold">
            21.23 KAR : 1 KSM
          </div>
          <div className="text-2e2d33 font-semibold">
            21.23 KAR <span className=" text-primary">≈ $4.1</span>
          </div>
        </div>
        <div className="w-full h-1 bg-eae9f0 mt-30"></div>
        <div className="mt-60 w-[226px] flex justify-start flex-col">
          <div className="text-14 leading-17 text-494853">14455 KSM <span className="text-primary font-medium">55%</span></div>
          <div className="w-full h-12 rounded-8 bg-eae9f0 mt-10 relative">
            <div className="h-full bg-primary rounded-8" style={{width : `${55}%`}}></div>
          </div>
          <div className="mt-12 text-14 leading-17 text-494853 text-right">20000 KAR</div>
        </div>
        <div className="my-24 text-16 leading-20 text-7b7986 font-medium">OR</div>
        <div className=" w-[226px] flex justify-start flex-col">
          <div className="text-14 leading-17 text-494853">14455 KSM <span className="text-primary font-medium">55%</span></div>
          <div className="w-full h-12 rounded-8 bg-eae9f0 mt-10 relative">
            <div className="h-full bg-primary rounded-8" style={{width : `${55}%`}}></div>
          </div>
          <div className="mt-12 text-14 leading-17 text-494853 text-right">20000 KAR</div>
        </div>
        <div className=" mt-44 text-14 leading-17 text-7b7986 font-medium">The target hasn't been met yet...</div>
      </Card>
    </div>
  );
};

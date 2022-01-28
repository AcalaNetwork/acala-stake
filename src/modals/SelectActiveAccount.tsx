import React, { useMemo } from "react";
import { AddressAvatar } from "../components/AddressAvatar";
import { Modal, ModalHeader } from "../components/Modal";
import { useExtension } from "../connector";
import { useModal } from "../state";
import { ModalType } from "../state/application/types";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { Selector } from "../components/form/Selector";
import { Address } from "../components/Address";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import CopyIcon from "/public/icons/copy.svg";
import LinkIcon from "/public/images/link.svg";
import { Copy } from "../components/Copy";

const btnRender = (active: InjectedAccount) => {
  return (
    <div className="flex flex-between pl-24 pr-28 h-full w-full">
      <div className="flex flex-center">
        <AddressAvatar
          address={active?.address}
          size={40}
          className="w-40 h-40 bg-[#E5EBF1]"
        />
        <div className="ml-22">
          <span className="text-20 leading-[24px] font-medium text-333">
            {active?.name}
          </span>
          <Address
            className="text-14 leading-17 text-494853 mt-8"
            address={active?.address}
          />
        </div>
      </div>
      <ChevronDownIcon className="w-18 h-18" />
    </div>
  );
};

const ItemRender = (value: InjectedAccount, selected: InjectedAccount) => (
  <div className="py-12 px-8 rounded-8 flex flex-between hover:bg-fff">
    <div className="flex flex-center">
      <AddressAvatar
        address={value.address}
        size={20}
        className="w-20 h-20 bg-[#E5EBF1]"
      />
      <div className="ml-8 text-16 font-medium text-333">{value.name}</div>
    </div>
    <div className="flex flex-center gap-10">
      <Address
        className="text-14 leading-17 text-494853"
        address={value.address}
      />
      {selected && selected.address === value.address ? (
        <CheckIcon
          className="h-[20px] w-[20px] text-primary"
          aria-hidden="true"
        />
      ) : (
        <div className="h-[20px] w-[20px]"></div>
      )}
    </div>
  </div>
);

export const SelectActiveAccount = () => {
  const type = ModalType.selectAccount;
  const [visible, , close] = useModal(type);
  const { injectedAccounts, active, setActive } = useExtension();

  const handleChange = (value: InjectedAccount) => {
    setActive(value);
  };

  const items = useMemo(() => {
    return injectedAccounts
      ? injectedAccounts.map((item) => {
          return {
            value: item,
            render: ItemRender,
          };
        })
      : [];
  }, [injectedAccounts]);

  const data = [];

  return (
    <Modal
      contentClassName="pb-0"
      visible={visible}
      onClose={close}
      header={<ModalHeader onClose={close}>Choose Account</ModalHeader>}
    >
      <div className="px-40 pt-32 w-full">
        <Selector
          rootClassName="border border-d6d3de rounded-16 h-[80px] relative"
          value={active}
          onChange={handleChange}
          items={items}
          render={btnRender}
        />
        <div className="mt-14 ml-7 mb-36 text-primary text-14 leading-17 flex">
          <div className="flex items-center justify-start gap-8">
            <CopyIcon />
            <Copy
              text={active?.address}
              displayText="Copy Address"
              successText="Copy Success"
            />
          </div>
          <a
            href={"/"}
            target={"_blank"}
            className="flex flex-center ml-68 gap-8"
          >
            <LinkIcon />
            View on Subscan
          </a>
        </div>
      </div>
      <div className="text-14 bg-[#645aef] bg-opacity-5 pt-26 px-40 pb-40">
        <div className="flex flex-between">
          <span className="leading-20 font-medium text-494853">
            Transactions History
          </span>
          <span className="text-primary leading-17">View All</span>
        </div>
        <div className=" max-h-[212px] overflow-y-auto">
          {data.map((item) => {
            return (
              <div className=" mt-32 flex flex-between">
                <div className="text-2e2d33">{item.mint}</div>
                <div className=" text-494853">{item.type}</div>
                <div className="text-13 text-7b7986">{item.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

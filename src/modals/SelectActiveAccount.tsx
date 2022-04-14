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
import { memo } from "react";

const btnRender = (active: InjectedAccount) => {
  return (
    <div className="flex flex-between pl-24 pr-28 h-full w-full">
      <div className="flex flex-center">
        <AddressAvatar
          address={active?.address}
          className="w-40 h-40 bg-[#E5EBF1]"
          size={40}
        />
        <div className="ml-22">
          <span className="text-20 leading-[24px] font-medium text-333">
            {active?.name}
          </span>
          <Address
            address={active?.address}
            className="text-14 leading-17 text-494853 mt-8"
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
        className="w-20 h-20 bg-[#E5EBF1]"
        size={20}
      />
      <div className="ml-8 text-16 font-medium text-333">{value.name}</div>
    </div>
    <div className="flex flex-center gap-10">
      <Address
        address={value.address}
        className="text-14 leading-17 text-494853"
      />
      {selected && selected.address === value.address ? (
        <CheckIcon
          aria-hidden="true"
          className="h-[20px] w-[20px] text-primary"
        />
      ) : (
        <div className="h-[20px] w-[20px]"></div>
      )}
    </div>
  </div>
);

export const SelectActiveAccount = memo(() => {
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
      header={<ModalHeader onClose={close}>Choose Account</ModalHeader>}
      onClose={close}
      visible={visible}
    >
      <div className="px-40 pt-32 w-full">
        <Selector
          items={items}
          onChange={handleChange}
          render={btnRender}
          rootClassName="border border-d6d3de rounded-16 h-[80px] relative"
          value={active}
        />
        <div className="mt-14 ml-7 mb-36 text-primary text-14 leading-17 flex">
          <div className="flex items-center justify-start gap-8">
            <CopyIcon />
            <Copy
              displayText="Copy Address"
              successText="Copy Success"
              text={active?.address}
            />
          </div>
          <a
            className="flex flex-center ml-68 gap-8"
            href={"/"}
            rel="noreferrer"
            target={"_blank"}
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
          {data.map((item, i) => {
            return (
              <div className=" mt-32 flex flex-between"
                key={i}>
                <div className="text-2e2d33">{item.mint}</div>
                <div className=" text-494853">{item.type}</div>
                <div className="text-13 text-grey-3">{item.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
});

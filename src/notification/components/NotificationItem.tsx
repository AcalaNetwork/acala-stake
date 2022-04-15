import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import ErrorIcon from "/public/notification/error.svg";
import InfoIcon from "/public/notification/info.svg";
import SuccessIcon from "/public/notification/success.svg";
import WarningIcon from "/public/notification/warning.svg";
import CloseIcon from "/public/icons/close.svg";
import { NotificationData, NotificationType } from "../types";
import { Transition } from "@headlessui/react";

const ICON_MAP: Record<NotificationType, any> = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

interface NotificationItemProps {
	key: string;
	data: NotificationData;
	dismiss: (key: string) => void;
	className?: string;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  data,
  dismiss,
}) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, [setShow]);

  const handleDismiss = useCallback(() => {
    dismiss(data.key);
  }, [dismiss, data]);

  return (
    <Transition
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={show}
    >
      <div className="relative px-24 py-18  bg-fff shadow flex rounded-8 min-w-[360px] max-w-[520px] mb-16">
        {data.closeable ? (
          <div
            className="absolute top-12 right-12 cursor-pointer"
            onClick={handleDismiss}
          >
            <CloseIcon />
          </div>
        ) : null}
        {data.type ? (
          <div className="mr-12">
            {data.icon ?? React.createElement(ICON_MAP[data.type])}
          </div>
        ) : null}
        <div className="text-2e2d33 leading-20">
          {data.title ? (
            <div className="font-medium mb-8 text-20">{data.title}</div>
          ) : null}
          {data.message ? (
            <div className="text-18 text-ABAAB9">{data.message}</div>
          ) : null}
        </div>
      </div>
    </Transition>
  );
};

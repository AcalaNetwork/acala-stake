import React, { FC } from "react";
import { useNotificationContext } from "../hooks";
import { NotificationItem } from "./NotificationItem";

export const NotificationContainer: FC = () => {
	const { data, dismiss, dismissAll } = useNotificationContext();

  const notifications = data.reverse();

	return (
		<div className='z-50 fixed right-24 top-68'>
			{notifications.length >= 3 ? (
				<div onClick={dismissAll}>Dismiss all</div>
			) : null}
			{notifications.map((item) => {
				const current = data.find((i) => item.key === i.key);

				if (!current) return null;

				return (
					<NotificationItem
						data={current}
						dismiss={dismiss}
						key={current.key}
					/>
				);
			})}
		</div>
	);
};

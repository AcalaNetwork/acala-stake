import { FC, useMemo } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { memo } from "react";
import { BaseComponentProps } from "./types";
import clsx from "clsx";
import { uniqueId } from "lodash";

interface StepItem {
  value: number;
  label: string;
}

interface StepProps extends BaseComponentProps {
  active: number;
  items: StepItem[];
}

interface StepItemProps extends StepItem {
  index: number;
  isActive: boolean;
  isComplated: boolean;
}

const StepItem: FC<StepItemProps> = ({ index, isComplated, isActive, label }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-start h-full">
        <div className={
          clsx(
            "w-32 h-32 rounded-full flex flex-center border text-16 font-semibold ",
            {
              'border-primary text-primary': isActive,
              'border-primary bg-primary': isComplated,
              'border-gray-4 text-grey-4': !(isActive || isComplated)
            }
          )
        }>
          {isComplated ? (
            <CheckIcon className="text-white w-24 h-24" />
          ) : (index + 1)}
        </div>
        <div className={clsx(
          "absolute mt-8 text-14 leading-17 text-center font-medium transform translate-y-32",
          {
            'text-primary': isActive || isComplated,
            'text-grey-4': !(isActive || isComplated)
          }
        )}>
          {label}
        </div>
      </div>
    </div>
  );
};

export const Step = memo<StepProps>(({ className, active, items }) => {
  const idPrefix = useMemo(() => uniqueId('step-'), []);

  return (
    <div className={clsx("flex flex-between flex-row w-full pb-25 px-32", className)}>
      {items.map((item, i) => {
        const components = [(
          <StepItem
            key={`${idPrefix}-${item.value}`}
            {...item}
            index={i}
            isActive={active === item.value}
            isComplated={active > item.value}
          />
        )];

        if (i !== items.length - 1) {
          components.push(
            <div
              className={clsx('h-[1px] w-full', item.value < active ? "bg-primary" : "bg-grey-66")}
              key={`${idPrefix}-line-${i}`}
            />
          );
        }

        return components;
      })}
    </div>
  );
});

import { FC, useMemo } from "react";
import { CheckIcon } from "@heroicons/react/solid";

interface StepDataProps {
  id: number;
  desc?: string;
}

interface StepProps {
  active: number;
  data: StepDataProps[];
}

interface StepItemProps extends StepDataProps {
  active: number;
}

interface ItemProps {
  desc?: string;
  id: number;
}

const CompletedItem: FC<ItemProps> = ({ desc }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="w-32 h-32 rounded-circle flex flex-center bg-primary ">
        <CheckIcon className="text-white w-24 h-24" />
      </div>
      <div className="absolute mt-8 text-14 leading-17 text-primary text-center font-medium transform translate-y-32">
        {desc}
      </div>
    </div>
  );
};
const ActiveItem: FC<ItemProps> = ({ id, desc }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="w-32 h-32 rounded-circle flex flex-center text-primary border border-primary text-16 font-semibold bg-white">
        {id}
      </div>
      <div className="absolute mt-8 text-14 leading-17 text-primary text-center font-medium transform translate-y-32">
        {desc}
      </div>
    </div>
  );
};
const NextItem: FC<ItemProps> = ({ id, desc }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="w-32 h-32 rounded-circle flex flex-center border border-abaab9 text-16 text-abaab9 font-semibold bg-white">
        {id}
      </div>
      <div className="absolute mt-8 text-14 leading-17 text-abaab9 text-center font-medium transform translate-y-32">
        {desc}
      </div>
    </div>
  );
};

const StepItem: FC<StepItemProps> = ({ active, id, desc }) => {
  const isActive = useMemo(() => active === id, [active, id]);
  const isCompleted = useMemo(() => active > id, [active, id]);

  return (
    <div className="flex flex-col">
      {isCompleted ? (
        <CompletedItem desc={desc}
          id={id} />
      ) : isActive ? (
        <ActiveItem desc={desc}
          id={id} />
      ) : (
        <NextItem desc={desc}
          id={id} />
      )}
    </div>
  );
};

export const Step: FC<StepProps> = ({ active, data }) => {
  return (
    <div className="flex flex-between flex-row w-full mt-12 mb-24 px-32">
      {data.flatMap((item, i) => {
        const stepItem = <StepItem key={item.id}
          {...item}
          active={active} />;

        if (i !== data.length - 1) {
          return [
            stepItem,
            <div
              className={`h-1 w-full ${i < active - 1 ? "bg-primary" : "bg-abaab9"}`}
              key={`spacer-${item.id}`}
            ></div>,
          ];
        }

        return [stepItem];
      })}
    </div>
  );
};

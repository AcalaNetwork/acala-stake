import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface TabProps {
	value: string;
	children?: ReactNode;
	onChange?: (value?: string) => void;
}

export const Tab = React.memo<TabProps>(({ value, children, onChange }) => {
  const { active, onChange: onTabChange } = useContext(InnerTabsContext);

  const handleClick = useCallback(() => {
    if (onChange) {
      onChange(value);
    }

    onTabChange(value);
  }, [value, onChange, onTabChange]);

  return (
    <div
      className={`text-16 text-center w-[120px] pb-8 cursor-pointer ${
        value === active ? "text-primary border-b-2 border-primary" : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
});

interface TabsPanelProps {
	value: string;
	children?: ReactNode;
}

export const TabsPanel = React.memo<TabsPanelProps>(({ value, children }) => {
  const { active } = useContext(InnerTabsContext);

  if (value === active) return <>{children}</>;

  return null;
});

interface TabsContextProps {
	init?: string;
	children?: ReactNode;
}

export const TabsContext = React.memo<TabsContextProps>(
  ({ children, init }) => {
    const [active, setActive] = useState<string>(init);

    return (
      <InnerTabsContext.Provider value={{ active, onChange: setActive }}>
        {children}
      </InnerTabsContext.Provider>
    );
  }
);

interface TabsProps {
	init?: string;
	className?: string;
	children?: ReactNode;
}

export const Tabs = React.memo<TabsProps>(({ className, children }) => {
  return (
    <div
      className={`flex flex-center gap-48 tracking-[1px] font-semibold text-16 leading-[32px] ${className}`}
    >
      {children}
    </div>
  );
});

interface TabsContextData {
	active: string;
	onChange: (value: string) => void;
}

const InnerTabsContext = createContext<TabsContextData>(null);

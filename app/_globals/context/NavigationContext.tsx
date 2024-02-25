"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type NavigationContextType = {
  sideNavigationOpenState: boolean;
  setSideNavigationOpenState: Dispatch<SetStateAction<boolean>>;
};

const navigationContext = createContext<NavigationContextType>({
  sideNavigationOpenState: false,
  setSideNavigationOpenState: () => {},
});

export const useNavigationContext = () => {
  const user = useContext(navigationContext);
  if (!user) {
    throw new Error("useUser must be used within a Navigation Provider");
  }

  return user;
};

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [sideNavigationOpenState, setSideNavigationOpenState] = useState(false);

  return (
    <navigationContext.Provider
      value={{ sideNavigationOpenState, setSideNavigationOpenState }}
    >
      {children}
    </navigationContext.Provider>
  );
};

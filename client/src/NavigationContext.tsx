import React from "react";
import { DetailView } from "./views/DetailView";
import { ListView } from "./views/ListView";

type View = 'ListView' | ['DetailView', { toDoId: string }];

interface NavigationContextShape {
  activeView: View,
  setActiveView: (view: View) => void,
  renderActiveView: () => React.ReactNode,
};

export const NavigationContext = React.createContext<NavigationContextShape>({} as NavigationContextShape);

export const NavigationContextProvider = ({ children }: React.PropsWithChildren) => {
  const [activeView, setActiveView] = React.useState<View>('ListView');

  const renderActiveView = React.useCallback(() => {
    const [viewName, viewProps] = (typeof activeView === "string")
      ? [activeView, {}]
      : [activeView[0], activeView[1]];

    switch (viewName) {
      case "DetailView":
        return <DetailView {...viewProps} />
      default:
        return <ListView />;
    };
  }, [activeView]);

  return (
    <NavigationContext.Provider value={{ activeView, setActiveView, renderActiveView }}>
      {children}
    </NavigationContext.Provider>
  );
}

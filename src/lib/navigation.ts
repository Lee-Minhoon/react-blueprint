export enum Page {
  Home = "/",

  DesignPatterns = "/design-patterns",
  DesignPatternsObserver = "/design-patterns/observer",
  DesignPatternsObserverToast = "/design-patterns/observer/toast",

  CompoundComponents = "/compound-components",
  CompoundComponentsSelect = "/compound-components/select",
}

export interface NavigationItem {
  label: string;
  pathname: Page;
  children?: NavigationItem[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "DesignPatterns",
    pathname: Page.DesignPatterns,
    children: [
      {
        label: "Observer",
        pathname: Page.DesignPatternsObserver,
        children: [
          {
            label: "Toast",
            pathname: Page.DesignPatternsObserverToast,
          },
        ],
      },
    ],
  },
  {
    label: "CompoundComponents",
    pathname: Page.CompoundComponents,
    children: [
      {
        label: "Select",
        pathname: Page.CompoundComponentsSelect,
      },
    ],
  },
];

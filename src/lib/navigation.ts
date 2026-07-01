export enum Page {
  Home = "/",

  DesignPatterns = "/design-patterns",
  DesignPatternsObserver = "/design-patterns/observer",
  DesignPatternsObserverToast = "/design-patterns/observer/toast",
  DesignPatternsObserverWindowEvent = "/design-patterns/observer/window-event",
  DesignPatternsStrategy = "/design-patterns/strategy",
  DesignPatternsStrategyPayment = "/design-patterns/strategy/payment",
  DesignPatternsStrategyLogin = "/design-patterns/strategy/login",

  CompoundComponents = "/compound-components",
  CompoundComponentsSelect = "/compound-components/select",
  CompoundComponentsImageUploader = "/compound-components/image-uploader",
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
          {
            label: "Window Event",
            pathname: Page.DesignPatternsObserverWindowEvent,
          },
        ],
      },
      {
        label: "Strategy",
        pathname: Page.DesignPatternsStrategy,
        children: [
          {
            label: "Payment",
            pathname: Page.DesignPatternsStrategyPayment,
          },
          {
            label: "Login",
            pathname: Page.DesignPatternsStrategyLogin,
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
      {
        label: "Image Uploader",
        pathname: Page.CompoundComponentsImageUploader,
      },
    ],
  },
];

export enum Page {
  Home = "/",

  DesignPatterns = "/design-patterns",
  DesignPatternsObserver = "/design-patterns/observer",
  DesignPatternsObserverToast = "/design-patterns/observer/toast",
  DesignPaterrnsObserverWindowEvent = "/design-patterns/observer/window-event",

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
            pathname: Page.DesignPaterrnsObserverWindowEvent,
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

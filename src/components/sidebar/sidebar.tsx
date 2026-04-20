"use client";

import { NAVIGATION_ITEMS } from "@/lib/navigation";

import { SidebarItem } from "./sidebar-item";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-2xs bg-sidebar max-h-screen pt-2 pl-2 gap-2">
      <h1 className="font-bold text-xs text-muted-foreground tracking-widest pl-2">
        REACT BLUEPRINT
      </h1>
      <ul className="flex flex-col gap-2 overflow-y-scroll">
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <li key={item.label}>
              <SidebarItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

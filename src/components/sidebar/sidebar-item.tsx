import { ChevronRightIcon, FolderIcon } from "lucide-react";
import Link from "next/link";

import { NavigationItem } from "@/lib/navigation";
import { toUrl } from "@/lib/routes";

import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface SidebarItemProps {
  item: NavigationItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
  if (item.children) {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group w-full justify-between transition-none hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex gap-2 items-center">
              <FolderIcon />
              {item.label}
            </div>
            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <ul className="border-l border-sidebar-border ml-4 mt-2 pl-2">
            {item.children.map((child) => (
              <li key={child.label}>
                <SidebarItem item={child} />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      asChild
      variant="link"
      size="sm"
      className="w-full justify-start gap-2 text-foreground"
    >
      <Link href={toUrl(item.pathname)}>{item.label}</Link>
    </Button>
  );
}

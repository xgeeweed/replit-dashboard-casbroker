import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

interface BreadcrumbItemType {
  href: string;
  label: string;
}

interface EnhancedBreadcrumbProps {
  items: (BreadcrumbItemType | null)[];
  maxItems?: number;
}

function truncate(str: string, n: number): string {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

function NavTrace({ items, maxItems = 3 }: EnhancedBreadcrumbProps): JSX.Element {
  items = items.filter((item) => item !== null);
  const truncatedItems = items.length > maxItems ? [items[0], { href: "#", label: "..." }, ...items.slice(-2)] : items;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {truncatedItems.map((item, index) => (
          <Fragment key={index}>
            {item && (
              <>
                <BreadcrumbItem>
                  {index === truncatedItems.length - 1 || item.href === "#" ? (
                    <BreadcrumbPage>{truncate(item.label, 20)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{truncate(item.label, 20)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < truncatedItems.length - 1 && <BreadcrumbSeparator />}
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default NavTrace;

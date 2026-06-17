import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

function Breadcrumb({ className, ...props }) {
  return <nav aria-label="Fil d'ariane" className={cn(className)} {...props} />;
}

function BreadcrumbList({ className, ...props }) {
  return <ol className={cn("flex items-center gap-1.5 flex-wrap text-sm text-gray-500", className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }) {
  return <li className={cn("flex items-center gap-1.5", className)} {...props} />;
}

function BreadcrumbLink({ className, href, ...props }) {
  return (
    <Link href={href || "/"} className={cn("hover:text-[var(--color-brand)] transition-colors", className)} {...props} />
  );
}

function BreadcrumbPage({ className, ...props }) {
  return <span className={cn("text-[#131212] font-medium", className)} aria-current="page" {...props} />;
}

function BreadcrumbSeparator({ className, ...props }) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("text-gray-300", className)} {...props}>
      <ChevronRight size={13} />
    </li>
  );
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };

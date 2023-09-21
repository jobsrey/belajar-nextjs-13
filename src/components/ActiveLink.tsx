"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    // you get a global isActive class name, it is better than
    // nothing, but it means you do not have scoping ability in
    // certain cases
    <Link {...rest} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

export default ActiveLink;

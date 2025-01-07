"use client";

import { links } from "@/lib/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathName = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={`${
            pathName === link.href && "text-accent border-b-2 border-accent"
          } capitalize font-medium hover:text-accent transition-all`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;

"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
const Nav = () => {
  const pathName = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <a
          href={link.href}
          key={link.href}
          className={`${pathName === link.href && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Nav;

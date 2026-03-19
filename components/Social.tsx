import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  FaLinkedinIn: <FaIcons.FaLinkedinIn />,
  FaGithub: <FaIcons.FaGithub />,
  FaYoutube: <FaIcons.FaYoutube />,
};

type SocialProps = {
  iconStyles: string;
  containerStyles: string;
  socials: {
    platform: string;
    url: string;
    iconName: string;
  }[];
};
const Social = ({ iconStyles, containerStyles, socials = [] }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((social) => (
        <Link href={social.url} key={social.url} className={iconStyles} target="_blank" rel="noopener noreferrer">
          {ICON_MAP[social.iconName] || <FaIcons.FaGithub />}
        </Link>
      ))}
    </div>
  );
};

export default Social;

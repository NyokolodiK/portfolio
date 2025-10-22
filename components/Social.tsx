import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";

const socials = [
  {
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/kagiso-nyokolodi/",
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/NyokolodiK",
  },
  {
    icon: <FaYoutube />,
    link: "https://youtube.com",
  },
];

type SocialProps = {
  iconStyles: string;
  containerStyles: string;
};
const Social = ({ iconStyles, containerStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((social) => (
        <Link href={social.link} key={social.link} className={iconStyles}>
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;

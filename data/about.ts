export interface AboutItem {
  title: string;
  description: string;
}

export interface AboutData {
  title: string;
  description: string;
  info: AboutItem[];
}

export const aboutData: AboutData = {
  title: "About",
  description:
    "Over 10 years of experience in full-stack development, specializing in high-performance front-end applications using React, Next.js, and TypeScript. Expert in designing scalable APIs, databases, and enhancing user experience. Proven leader in mentoring teams and driving excellence through agile methodologies and best practices. Strong problem-solver with a passion for continuous learning.",
  info: [
    {
      title: "Name",
      description: "Kagiso Nyokolodi",
    },
    {
      title: "Age",
      description: "35",
    },
    {
      title: "Location",
      description: "South Africa",
    },
    {
      title: "Email",
      description: "knyokolodi@gmail.com",
    },
    {
      title: "Phone",
      description: "+27 72 382 8823",
    },
  ],
};

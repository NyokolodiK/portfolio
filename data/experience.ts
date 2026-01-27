export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
}

export interface ExperienceData {
  title: string;
  description: string;
  items: ExperienceItem[];
}

export const experienceData: ExperienceData = {
  title: "Experience",
  description: "Work Experience",
  items: [
    {
      company: "Nawiri Group",
      position: "Senior Software Engineer, AI Enthusiast",
      duration: "2022 – Present",
    },
    {
      company: "NTT",
      position: "Senior Software Engineer",
      duration: "July 2020 – 2022",
    },
    {
      company: "OneCart",
      position: "Software Engineer",
      duration: "April 2020 – June 2020",
    },
    {
      company: "Dimension Data",
      position: "Senior Software Engineer",
      duration: "October 2018 – March 2020",
    },
    {
      company: "XPERTEK",
      position: "Software Developer",
      duration: "September 2015 – September 2018",
    },
    {
      company: "IntelliLab",
      position: "Web & Mobile Developer",
      duration: "April 2013 – August 2015",
    },
    {
      company: "Tshwane University of Technology",
      position: "Web & Games Developer Intern",
      duration: "February 2012 – December 2012",
    },
    {
      company: "Prolific Interactive Designz",
      position: "Freelancer",
      duration: "February 2013 – June 2018",
    },
  ],
};

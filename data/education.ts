export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
}

export interface EducationData {
  title: string;
  description: string;
  items: EducationItem[];
}

export const educationData: EducationData = {
  title: "My Education",
  description: "BTECH IT Web and Multimedia",
  items: [
    {
      institution: "Tshwane University of Technology",
      degree: "National Diploma IT Web and Multimedia",
      duration: "2013",
    },
    {
      institution: "Tshwane University of Technology",
      degree: "BTECH IT Web and Multimedia",
      duration: "2018",
    },
  ],
};

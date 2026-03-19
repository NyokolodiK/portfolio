import { groq } from 'next-sanity'

export const ALL_PROJECTS_QUERY = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  techStack,
  category,
  image,
  live,
  github,
  metrics
}`

export const ALL_CASE_STUDIES_QUERY = groq`*[_type == "caseStudy"] | order(date desc) {
  _id,
  "id": id.current,
  title,
  subtitle,
  description,
  content,
  problem,
  solution,
  outcomes,
  techStack,
  category,
  date,
  impact,
  metrics
}`

export const CASE_STUDY_BY_ID_QUERY = groq`*[_type == "caseStudy" && id.current == $id][0] {
  _id,
  "id": id.current,
  title,
  subtitle,
  description,
  content,
  problem,
  solution,
  outcomes,
  techStack,
  category,
  date,
  impact,
  metrics
}`

export const ALL_SERVICES_QUERY = groq`*[_type == "service"] | order(number asc) {
  _id,
  number,
  title,
  description,
  icon,
  features
}`

export const PROFILE_QUERY = groq`*[_type == "profile"][0] {
  name,
  title,
  description,
  email,
  phone,
  location,
  address,
  stats,
  socials
}`

export const ALL_EXPERIENCE_QUERY = groq`*[_type == "experience"] | order(order asc) {
  company,
  position,
  duration
}`

export const ALL_EDUCATION_QUERY = groq`*[_type == "education"] | order(order asc) {
  institution,
  degree,
  duration
}`

export const ALL_SKILLS_QUERY = groq`*[_type == "skill"] | order(order asc) {
  title,
  iconName
}`

export type NullableType<T> = T | null | undefined;

export type ExperienceItem = {
  id: string;
  type: 'experience';
  position: string | null;
  company: string | null;
  period: string | null;
  description: string | null;
};

export type EducationItem = {
  id: string;
  type: 'education';
  collage: string | null;
  major: string | null;
  period: string | null;
};

export type SkillsItem = {
  id: string;
  type: 'skills';
  items: string[];
};

export type CertificatesItem = {
  id: string;
  type: 'certificates';
  items: string[];
};

export type AboutMeItem = {
  id: string;
  type: 'aboutMe';
  content: string | null;
};

export type SectionItem = 
  | ExperienceItem 
  | EducationItem 
  | SkillsItem 
  | CertificatesItem 
  | AboutMeItem;

export type SectionsState = {
    sections: SectionItem[];
    param: string;
};
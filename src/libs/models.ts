import { DEPARTMENT, POSITION } from '@/utils';

export interface Profile {
  fullName?: string;
  dob?: Date;
  phone?: string;
  facebook?: string;
  school?: string;
  studentID?: string;
  userID?: number;
  gen?: number;
  departments?: DEPARTMENT[];
  position?: POSITION;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roleID: number;
  profile: Profile;
}

export interface Event {
  name: string;
  key: string;
  tag: string[];
  start: Date;
  thumbnail: number;
  description: string;
}

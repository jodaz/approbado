import { ReduxState, Record } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export type DialogStatus = {
  status: false | true,
  name: string
}

export interface Course extends Record {
  title: string;
}

export interface AppState extends ReduxState {
  theme: ThemeName;
}

export interface Session {
  id: number,
  created_at: Date;
  total: number;
}

export interface Subject extends Record {
  name: string,
  course_id: number;
  course: any;
  themes?: Theme[];
}

export interface Theme extends Record {
  name: string,
  subject_id: number;
  parent_id?: number;
}

export interface Teacher {
  id: number,
  full_name: string,
  organization_id: number;
}

export interface Student {
  id: number,
  full_name: string,
  organization_id: number;
}

export interface ModelableForm {
  id: number,
  modelType: string
}

export interface User extends Record {
  full_name: string,
  picture: string,
  active: boolean,
  organization_id: number
}

export interface Organization extends Record {
  name: string,
  organization_type_id: number,
}

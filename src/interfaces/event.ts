export interface Event {
  name: string;
  key: string;
  tag: string[];
  start: Date;
  end?: Date;
  thumbnail: number;
  description: string;
  url?: string;
  status: boolean;
  accountEvents?: any;
}

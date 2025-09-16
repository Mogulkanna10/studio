import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Inspector' | 'Viewer';
  avatar: string;
};

export type Sensor = {
  id: string;
  name: string;
  type: 'LiDAR' | 'Camera' | 'IMU' | 'Axle Encoder' | 'Ultrasonic';
  status: 'Online' | 'Offline' | 'Warning';
  Icon: LucideIcon;
  data: { time: string; value: number }[];
};

export type Anomaly = {
  id: string;
  timestamp: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  chainage: string;
  description: string;
};

export type Report = {
  id: string;
  date: string;
  generatedBy: string;
  summary: string;
};

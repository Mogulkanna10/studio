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
  type: 'LiDAR' | 'Camera' | 'IMU' | 'Axle Encoder';
  status: 'Online' | 'Offline' | 'Warning';
  iconName: 'Signal' | 'Waves' | 'Radio' | 'Camera';
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

export type ClassifierPerformanceData = {
  overallAccuracy: number;
  classMetrics: {
    className: string;
    accuracy: number;
  }[];
  confusionMatrix: number[][];
  classNames: string[];
};

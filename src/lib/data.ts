import {
  Signal,
  Camera,
  Waves,
  Radio,
  AlertTriangle,
  FileText,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import type { Sensor, Anomaly, User, Report } from './types';

// Mock Data Generation
const generateTimeSeriesData = (points = 20, min = 10, max = 100) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `T-${points - i}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export const sensors: Omit<Sensor, 'Icon'>[] = [
  {
    id: 'lidar-01',
    name: 'LiDAR Scanner',
    type: 'LiDAR',
    status: 'Online',
    iconName: 'Signal',
    data: generateTimeSeriesData(20, 2, 5),
  },
  {
    id: 'imu-01',
    name: 'Inertial Measurement Unit',
    type: 'IMU',
    status: 'Online',
    iconName: 'Waves',
    data: generateTimeSeriesData(20, -1, 1),
  },
  {
    id: 'axle-encoder-01',
    name: 'Axle Encoder',
    type: 'Axle Encoder',
    status: 'Warning',
    iconName: 'Radio',
    data: generateTimeSeriesData(20, 1000, 1020),
  },
  {
    id: 'ultrasonic-01',
    name: 'Ultrasonic Sensor',
    type: 'Ultrasonic',
    status: 'Offline',
    iconName: 'Signal',
    data: generateTimeSeriesData(20, 0, 0),
  },
];

export const anomalies: Anomaly[] = [
  {
    id: 'ANOM-001',
    timestamp: '2024-05-21 14:35:12',
    type: 'Track Geometry',
    severity: 'High',
    chainage: 'CH 12+345',
    description: 'Excessive lateral deviation detected. Potential rail misalignment.',
  },
  {
    id: 'ANOM-002',
    timestamp: '2024-05-21 14:32:05',
    type: 'Corrugation',
    severity: 'Medium',
    chainage: 'CH 10+800',
    description: 'Moderate rail corrugation detected on the right rail.',
  },
  {
    id: 'ANOM-003',
    timestamp: '2024-05-21 14:28:49',
    type: 'Ballast Defect',
    severity: 'Low',
    chainage: 'CH 08+150',
    description: 'Minor ballast fouling identified via LiDAR scan.',
  },
];

export const users: User[] = [
  {
    id: 'usr-001',
    name: 'Admin User',
    email: 'admin@railwatch.com',
    role: 'Administrator',
    avatar: 'https://i.pravatar.cc/150?u=admin@railwatch.com',
  },
  {
    id: 'usr-002',
    name: 'John Inspector',
    email: 'john.inspector@railwatch.com',
    role: 'Inspector',
    avatar: 'https://i.pravatar.cc/150?u=john.inspector@railwatch.com',
  },
  {
    id: 'usr-003',
    name: 'Jane Viewer',
    email: 'jane.viewer@railwatch.com',
    role: 'Viewer',
    avatar: 'https://i.pravatar.cc/150?u=jane.viewer@railwatch.com',
  },
];

export const reports: Report[] = [
    {
        id: 'REP-2024-001',
        date: '2024-05-20',
        generatedBy: 'John Inspector',
        summary: 'Routine inspection of Sector 4. Minor corrugation noted at CH 10+800, recommend monitoring. All other systems nominal.'
    },
    {
        id: 'REP-2024-002',
        date: '2024-05-18',
        generatedBy: 'Admin User',
        summary: 'Post-maintenance verification run for Sector 2. All previously flagged anomalies have been resolved. Track geometry is within tolerance.'
    }
];

export const navItems = [
    { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { href: '/reports', label: 'Reports', Icon: FileText },
    { href: '/settings', label: 'Settings', Icon: Settings },
]

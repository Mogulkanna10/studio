'use client';

import { useState, useEffect } from 'react';
import DataFilters from '@/components/dashboard/data-filters';
import DashboardViewSelector from '@/components/dashboard/dashboard-view-selector';
import AnomalyList from '@/components/dashboard/anomaly-list';
import CorrelationFinder from '@/components/dashboard/correlation-finder';
import PredictiveChart from '@/components/dashboard/predictive-chart';
import SensorCard from '@/components/dashboard/sensor-card';
import TrackHealthCard from '@/components/dashboard/track-health-card';
import VideoPlayer from '@/components/dashboard/video-player';
import { sensors } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState(null);

  useEffect(() => {
    setActiveView('track-health');
  }, []);

  const views = [
    { id: 'track-health', label: 'Track Health' },
    { id: 'anomalies', label: 'Anomalies' },
    { id: 'predictive', label: 'Predictions' },
    ...sensors.map(s => ({ id: s.id, label: s.name })),
    { id: 'video', label: 'Video Annotation' },
    { id: 'correlation', label: 'AI Assistant' },
  ];

  const renderActiveView = () => {
    if (activeView === null) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        )
    }
    if (activeView === 'track-health') {
      return <TrackHealthCard />;
    }
    if (activeView === 'anomalies') {
      return <AnomalyList />;
    }
    if (activeView === 'predictive') {
      return <PredictiveChart />;
    }
    if (activeView === 'video') {
      return <VideoPlayer />;
    }
    if (activeView === 'correlation') {
      return <CorrelationFinder />;
    }
    const sensor = sensors.find(s => s.id === activeView);
    if (sensor) {
      return <SensorCard sensor={sensor} />;
    }
    return <TrackHealthCard />; // Default view
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DataFilters />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <DashboardViewSelector
            views={views}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
        <div className="lg:col-span-3">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

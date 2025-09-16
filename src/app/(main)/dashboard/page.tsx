import type { Metadata } from "next";
import DataFilters from "@/components/dashboard/data-filters";
import SensorCard from "@/components/dashboard/sensor-card";
import { sensors } from "@/lib/data";
import AnomalyList from "@/components/dashboard/anomaly-list";
import CorrelationFinder from "@/components/dashboard/correlation-finder";
import VideoPlayer from "@/components/dashboard/video-player";

export const metadata: Metadata = {
  title: "Dashboard | RailWatch ITMS",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DataFilters />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
          {sensors.map((sensor) => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <VideoPlayer />
          <AnomalyList />
        </div>
      </div>
       <div className="grid grid-cols-1 gap-6">
          <CorrelationFinder />
        </div>
    </div>
  );
}

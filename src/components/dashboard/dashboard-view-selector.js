
import {
    ShieldCheck,
    AlertTriangle,
    TrendingUp,
    Signal,
    Waves,
    Radio,
    Camera,
    Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
    'Track Health': ShieldCheck,
    'Anomalies': AlertTriangle,
    'Predictions': TrendingUp,
    'LiDAR Scanner': Signal,
    'Inertial Measurement Unit': Waves,
    'Axle Encoder': Radio,
    'Track Camera': Camera,
    'Camera Feed': Camera,
    'AI Assistant': Wand2
};


export default function DashboardViewSelector({ views, activeView, setActiveView }) {

    return (
        <div className="flex flex-col gap-1 pr-4">
            {views.map(view => {
                const Icon = iconMap[view.label] || Signal;
                return (
                    <Button
                        key={view.id}
                        variant={activeView === view.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-base h-10 px-4"
                        onClick={() => setActiveView(view.id)}
                    >
                        <Icon className="mr-3 h-5 w-5 text-muted-foreground" />
                        {view.label}
                    </Button>
                )
            })}
        </div>
    )
}

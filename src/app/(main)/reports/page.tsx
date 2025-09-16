import ReportGenerator from '@/components/reports/report-generator';
import ReportList from '@/components/reports/report-list';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Reports | RailWatch ITMS',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report Management</h1>
        <p className="text-muted-foreground">
          Generate new reports and access historical data.
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ReportGenerator />
        </div>
        <div className="lg:col-span-3">
          <ReportList />
        </div>
      </div>
    </div>
  );
}

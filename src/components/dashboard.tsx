'use client';

import { useSensorData } from '@/hooks/use-sensor-data';
import { useViewport } from '@/hooks/use-viewport';
import { getLatestReading } from '@/lib/thingspeak';
import MetricsCards from './metrics-cards';
import SensorCharts from './sensor-charts';
import SmokeAlert from './smoke-alert';
import { AppSidebar } from './app-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { data, loading, error } = useSensorData();
  const { shouldShowScrollbar } = useViewport();
  
  const latestReading = getLatestReading(data);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-200">
                    Error Loading Data
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    {error}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset className="scroll-smart-hide">
        <div className={`flex-1 p-6 ${shouldShowScrollbar ? 'scroll-auto-smart' : 'scroll-smart-hide'}`}>
          {loading && data.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Loading sensor data...
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <SmokeAlert latestData={latestReading || undefined} />
              <MetricsCards latestData={latestReading || undefined} />
              <SensorCharts data={data} />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
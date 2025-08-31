'use client';

import * as React from 'react';
import { Download, Info } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { SensorData } from '@/lib/types';

interface AppSidebarProps {
  data: SensorData[];
}

export function AppSidebar({ data }: AppSidebarProps) {
  const lastUpdated = React.useMemo(() => {
    if (!data.length) return null;
    const latest = data[data.length - 1];
    return latest.timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + latest.timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' EDT';
  }, [data]);

  const handleDownloadDataset = () => {
    window.open('https://thingspeak.com/channels/2005329', '_blank');
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r">

      <SidebarContent className="p-6">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Environmental Monitoring System</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click on the hyperlink below to download the data, which will redirect you to 
              ThingSpeak. Then click the Export recent data button to download the dataset.
            </p>
          </div>

          {lastUpdated && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Last updated date at
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 font-mono break-all">
                    {lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleDownloadDataset} 
                  className="justify-start h-10 px-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                  <span className="font-medium">Download Dataset</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
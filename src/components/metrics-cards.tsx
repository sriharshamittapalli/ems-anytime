'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Wind, Cigarette } from 'lucide-react';
import { SensorData } from '@/lib/types';

interface MetricsCardsProps {
  latestData?: SensorData;
}

export default function MetricsCards({ latestData }: MetricsCardsProps) {
  const metrics = [
    {
      title: 'Temperature (C)',
      value: latestData ? latestData.temperature.toFixed(2) : '--',
      unit: '°F',
      icon: <Thermometer className="h-5 w-5 text-orange-500" />,
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      title: 'Humidity (%)',
      value: latestData ? latestData.humidity.toFixed(2) : '--',
      unit: '%',
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Air Quality',
      value: latestData ? latestData.airQuality.toFixed(2) : '--',
      unit: 'PPM',
      icon: <Wind className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'Smoke',
      value: latestData ? latestData.smoke.toFixed(2) : '--',
      unit: 'PPM',
      icon: <Cigarette className="h-5 w-5 text-gray-500" />,
      bgColor: 'bg-gray-50 dark:bg-gray-950/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <Card 
          key={metric.title} 
          className={`${metric.bgColor} ${metric.borderColor} transition-all hover:shadow-lg`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </div>
              <Badge variant="secondary" className="text-xs">
                {metric.unit}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
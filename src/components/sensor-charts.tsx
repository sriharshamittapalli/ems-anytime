'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { SensorData } from '@/lib/types';

interface SensorChartsProps {
  data: SensorData[];
}

const temperatureConfig = {
  temperature: {
    label: "Temperature",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const humidityConfig = {
  humidity: {
    label: "Humidity",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const airQualityConfig = {
  airQuality: {
    label: "Air Quality",
    color: "#10b981",
  },
} satisfies ChartConfig;

const smokeConfig = {
  smoke: {
    label: "Smoke",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export default function SensorCharts({ data }: SensorChartsProps) {
  // Transform data for recharts
  const chartData = data.map(item => ({
    time: item.timestamp.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    fullTime: item.timestamp.toLocaleString(),
    temperature: item.temperature,
    humidity: item.humidity,
    airQuality: item.airQuality,
    smoke: item.smoke,
  }));

  // Calculate stats and domains for each metric
  const stats = React.useMemo(() => {
    if (!data.length) return null;
    
    const latest = data[data.length - 1];
    const avg = {
      temperature: data.reduce((sum, item) => sum + item.temperature, 0) / data.length,
      humidity: data.reduce((sum, item) => sum + item.humidity, 0) / data.length,
      airQuality: data.reduce((sum, item) => sum + item.airQuality, 0) / data.length,
      smoke: data.reduce((sum, item) => sum + item.smoke, 0) / data.length,
    };

    // Calculate dynamic domains with some padding
    const temperatureValues = data.map(item => item.temperature);
    const humidityValues = data.map(item => item.humidity);
    const airQualityValues = data.map(item => item.airQuality);
    const smokeValues = data.map(item => item.smoke);

    const domains = {
      temperature: [
        Math.floor(Math.min(...temperatureValues) - 1),
        Math.ceil(Math.max(...temperatureValues) + 1)
      ],
      humidity: [
        Math.floor(Math.min(...humidityValues) - 2),
        Math.ceil(Math.max(...humidityValues) + 2)
      ],
      airQuality: [
        Math.floor(Math.min(...airQualityValues) - 5),
        Math.ceil(Math.max(...airQualityValues) + 5)
      ],
      smoke: [
        Math.floor(Math.min(...smokeValues) - 5),
        Math.ceil(Math.max(...smokeValues) + 5)
      ],
    };

    return { latest, avg, domains };
  }, [data]);

  return (
    <div className="mb-8">
      <Tabs defaultValue="environmental" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="environmental">Environmental Conditions</TabsTrigger>
          <TabsTrigger value="airquality">Air Quality Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="environmental" className="space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Chart */}
            <Card className="py-0">
              <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
                  <CardTitle>Temperature Monitoring</CardTitle>
                  <CardDescription>Real-time temperature readings in °F</CardDescription>
                </div>
                <div className="flex">
                  <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Current</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-red-600">
                      {stats?.latest.temperature.toFixed(1) || 0}°F
                    </span>
                  </div>
                  <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left border-l sm:border-t-0 sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Average</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-red-500/70">
                      {stats?.avg.temperature.toFixed(1) || 0}°F
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer config={temperatureConfig} className="aspect-auto h-[200px] w-full">
                  <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => value.slice(0, -3)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}°F`}
                      domain={stats?.domains.temperature as [number, number] || undefined}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          labelFormatter={(value) => `Time: ${value}`}
                        />
                      }
                    />
                    <Area
                      dataKey="temperature"
                      type="natural"
                      fill="var(--color-temperature)"
                      fillOpacity={0.3}
                      stroke="var(--color-temperature)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Humidity Chart */}
            <Card className="py-0">
              <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
                  <CardTitle>Humidity Levels</CardTitle>
                  <CardDescription>Environmental humidity percentage</CardDescription>
                </div>
                <div className="flex">
                  <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Current</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-blue-600">
                      {stats?.latest.humidity.toFixed(1) || 0}%
                    </span>
                  </div>
                  <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left border-l sm:border-t-0 sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Average</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-blue-500/70">
                      {stats?.avg.humidity.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer config={humidityConfig} className="aspect-auto h-[200px] w-full">
                  <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => value.slice(0, -3)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}%`}
                      domain={stats?.domains.humidity as [number, number] || undefined}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          labelFormatter={(value) => `Time: ${value}`}
                        />
                      }
                    />
                    <Bar
                      dataKey="humidity"
                      fill="var(--color-humidity)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="airquality" className="space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Air Quality Chart */}
            <Card className="py-0">
              <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
                  <CardTitle>Air Quality Index</CardTitle>
                  <CardDescription>Air quality measurements in PPM</CardDescription>
                </div>
                <div className="flex">
                  <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Current</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-green-600">
                      {stats?.latest.airQuality.toFixed(0) || 0}
                    </span>
                  </div>
                  <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left border-l sm:border-t-0 sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Average</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-green-500/70">
                      {stats?.avg.airQuality.toFixed(0) || 0}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer config={airQualityConfig} className="aspect-auto h-[200px] w-full">
                  <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => value.slice(0, -3)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value} PPM`}
                      domain={stats?.domains.airQuality as [number, number] || undefined}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          labelFormatter={(value) => `Time: ${value}`}
                        />
                      }
                    />
                    <Bar
                      dataKey="airQuality"
                      fill="var(--color-airQuality)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Smoke Detection Chart */}
            <Card className="py-0">
              <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
                  <CardTitle>Smoke Detection</CardTitle>
                  <CardDescription>Smoke and gas sensor readings</CardDescription>
                </div>
                <div className="flex">
                  <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Current</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-purple-600">
                      {stats?.latest.smoke.toFixed(0) || 0}
                    </span>
                  </div>
                  <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left border-l sm:border-t-0 sm:px-8 sm:py-6">
                    <span className="text-muted-foreground text-xs">Average</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl text-purple-500/70">
                      {stats?.avg.smoke.toFixed(0) || 0}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer config={smokeConfig} className="aspect-auto h-[200px] w-full">
                  <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => value.slice(0, -3)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}`}
                      domain={stats?.domains.smoke as [number, number] || undefined}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          labelFormatter={(value) => `Time: ${value}`}
                        />
                      }
                    />
                    <Area
                      dataKey="smoke"
                      type="natural"
                      fill="var(--color-smoke)"
                      fillOpacity={0.4}
                      stroke="var(--color-smoke)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
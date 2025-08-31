export interface ThingSpeakFeed {
  created_at: string;
  field1: string; // Temperature (°F)
  field2: string; // Humidity (%)
  field3: string; // Air Quality (PPM)
  field4: string; // Smoke (PPM)
}

export interface ThingSpeakResponse {
  feeds: ThingSpeakFeed[];
}

export interface SensorData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  airQuality: number;
  smoke: number;
}

export interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}
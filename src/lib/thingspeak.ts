import { ThingSpeakResponse, SensorData } from './types';

const THINGSPEAK_API_URL = 'https://api.thingspeak.com/channels/2097821/feeds.json';

export async function fetchThingSpeakData(): Promise<SensorData[]> {
  try {
    const response = await fetch(THINGSPEAK_API_URL, {
      // Add cache control to ensure fresh data
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ThingSpeakResponse = await response.json();
    
    // Transform ThingSpeak data to our SensorData format
    return data.feeds.map(feed => ({
      timestamp: new Date(feed.created_at),
      temperature: parseFloat(feed.field1) || 0,
      humidity: parseFloat(feed.field2) || 0,
      airQuality: parseFloat(feed.field3) || 0,
      smoke: parseFloat(feed.field4) || 0,
    }));
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    throw error;
  }
}

export function getLatestReading(data: SensorData[]): SensorData | null {
  if (data.length === 0) return null;
  return data[data.length - 1];
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });
}

export function isSmokeDetected(smokeLevel: number): boolean {
  return smokeLevel > 400;
}
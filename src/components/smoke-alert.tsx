'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { formatTimestamp, isSmokeDetected } from '@/lib/thingspeak';
import { SensorData } from '@/lib/types';

interface SmokeAlertProps {
  latestData?: SensorData;
}

export default function SmokeAlert({ latestData }: SmokeAlertProps) {
  if (!latestData || !isSmokeDetected(latestData.smoke)) {
    return null;
  }

  return (
    <Alert className="mb-6 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        <strong>Smoke Detected!</strong> High smoke levels detected at{' '}
        <span className="font-medium">
          {formatTimestamp(latestData.timestamp)} EDT
        </span>
        {' '}({latestData.smoke.toFixed(2)} PPM)
      </AlertDescription>
    </Alert>
  );
}
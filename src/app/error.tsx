'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            Something went wrong!
          </CardTitle>
          <CardDescription>
            An unexpected error has occurred.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We apologize for the inconvenience. Please try again.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

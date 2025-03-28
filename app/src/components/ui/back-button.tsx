'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { ChevronLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center text-gray-600 hover:text-gray-900"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );
}

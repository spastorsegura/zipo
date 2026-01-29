'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCardSkeleton() {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image Skeleton */}
        <div className="relative h-64 w-full bg-gray-100">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

        {/* Product Info Skeleton */}
        <div className="p-4">
          {/* Product Title Skeleton */}
          <div className="space-y-2 mb-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          
          {/* Product Description Skeleton */}
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-3 w-2/3 mb-3" />
          
          {/* Price and Button Skeleton */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-16" />
            </div>
            
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

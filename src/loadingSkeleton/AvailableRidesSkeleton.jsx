import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AvailableRidesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-full">
          <CardHeader>
            <Skeleton className="h-5 w-56 rounded-md bg-gray-300 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-4 w-44 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-4 w-28 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-9 w-24 rounded-md bg-gray-200 animate-pulse mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AvailableRidesSkeleton;
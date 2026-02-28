import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RideDetailsSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl">
        <CardContent className="p-6 space-y-6">
          
          {/* ================= Header ================= */}
          <div className="flex items-start justify-between">
            <div className="space-y-3 w-full">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>

            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          {/* ================= Ride Summary ================= */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 rounded-xl p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* ================= Divider ================= */}
          <div className="h-px bg-gray-200" />

          {/* ================= Driver & Vehicle ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-5">
            
            {/* Driver */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Vehicle */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          {/* ================= Seat Selection ================= */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>

          {/* ================= CTA ================= */}
          <div className="pt-4">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default RideDetailsSkeleton;
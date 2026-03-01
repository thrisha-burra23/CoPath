import { Skeleton } from "@/components/ui/skeleton";

const MyBookingsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-10">
        
        {/* Page Title */}
        <Skeleton className="h-8 w-48" />

        {/* ================= Passenger Section ================= */}
        <div>
          <Skeleton className="h-6 w-40 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4"
              >
                {/* Route */}
                <Skeleton className="h-5 w-3/4" />

                {/* Date */}
                <Skeleton className="h-4 w-1/2" />

                {/* Status */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <Skeleton className="h-9 w-20 rounded-lg" />
                  <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ================= Driver Section ================= */}
        <div>
          <Skeleton className="h-6 w-40 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[1, 2, 3].map((i) => (
              <div
                key={`driver-${i}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4"
              >
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default MyBookingsPageSkeleton;
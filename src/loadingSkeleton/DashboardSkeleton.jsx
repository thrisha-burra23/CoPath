import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <>
      {/* Header Skeleton */}
      <header className="px-8 py-4 flex items-center justify-between border-b">
        <Skeleton className="h-6 w-40 rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
      </header>

      <main className="relative px-8 py-6 space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Search Card Skeleton */}
          <div className="col-span-1 space-y-4">
            <Skeleton className="h-6 w-32 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
          </div>

          {/* Map Skeleton */}
          <div className="col-span-2 border rounded-xl flex items-center justify-center">
            <Skeleton className="h-64 w-full rounded-xl bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Bottom Section (Outlet placeholder) */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-20 w-full rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="px-8 py-6 border-t">
        <Skeleton className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
      </footer>
    </>
  );
};

export default DashboardSkeleton;
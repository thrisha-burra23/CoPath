import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DriverRequestsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-4 w-72 rounded-md bg-gray-200 animate-pulse" />
      </div>

      {/* Table Card Skeleton */}
      <Card className="rounded-2xl">
        <CardHeader>
          <Skeleton className="h-5 w-40 rounded-md bg-gray-300 animate-pulse" />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr
                    key={i}
                    className="bg-white rounded-xl shadow-sm transition"
                  >
                    {/* Driver cell */}
                    <td className="px-3 py-4 rounded-l-xl">
                      <Skeleton className="h-4 w-32 mb-2 rounded-md bg-gray-200 animate-pulse" />
                      <Skeleton className="h-3 w-24 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* Vehicle */}
                    <td className="px-3 py-4">
                      <Skeleton className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* License */}
                    <td className="px-3 py-4">
                      <Skeleton className="h-4 w-20 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* Applied On */}
                    <td className="px-3 py-4">
                      <Skeleton className="h-4 w-28 rounded-md bg-gray-200 animate-pulse" />
                    </td>

                    {/* Status */}
                    <td className="px-3 py-4">
                      <Skeleton className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4 rounded-r-xl">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-16 rounded-md bg-gray-200 animate-pulse" />
                        <Skeleton className="h-8 w-20 rounded-md bg-gray-200 animate-pulse" />
                        <Skeleton className="h-8 w-20 rounded-md bg-gray-200 animate-pulse" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverRequestsSkeleton;

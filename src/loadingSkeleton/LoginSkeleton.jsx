import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoginSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default LoginSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

const ServicesSectionLoadingState = () => {
  return (
    <div className="col-span-12 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-12 gap-6">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white animate-pulse"
        >
          <Skeleton className="w-16 h-16 mb-2  rounded-lg"></Skeleton>
          <Skeleton className="h-4 w-20  rounded mb-2"></Skeleton>
          <Skeleton className="h-3 w-16  rounded"></Skeleton>
        </div>
      ))}
    </div>
  );
};

export default ServicesSectionLoadingState;

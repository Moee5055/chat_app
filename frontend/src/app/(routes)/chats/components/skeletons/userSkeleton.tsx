import { Skeleton } from '@/components/ui/skeleton';
import { Fragment } from 'react';

const UserSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Fragment key={index}>
            <div className="flex items-center space-x-4 mb-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default UserSkeleton;

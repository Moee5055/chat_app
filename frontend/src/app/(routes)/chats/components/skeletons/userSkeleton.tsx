import { Fragment } from 'react';

const UserSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Fragment key={index}>
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <div className="h-4 w-[150px] bg-muted rounded animate-pulse" />
                <div className="h-3 w-[200px] bg-muted rounded animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default UserSkeleton;

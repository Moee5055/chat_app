import { CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const ChatBodySkeleton = () => {
  // Create an array of different message layouts for the skeleton
  const skeletonMessages = [
    { id: 1, role: 'user', width: 'w-60' },
    { id: 2, role: 'assistant', width: 'w-72' },
    { id: 3, role: 'user', width: 'w-48' },
    { id: 4, role: 'assistant', width: 'w-64' },
    { id: 5, role: 'user', width: 'w-64' },
  ];

  return (
    <>
      <CardContent className="px-0">
        <ScrollArea className="h-[79vh] px-4 py-2">
          {skeletonMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`flex items-start ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                } gap-2 max-w-[80%]`}
              >
                <Skeleton className="h-8 w-8 rounded-full mt-1" />
                <div className="flex flex-col">
                  <Skeleton
                    className={`h-16 ${message.width} rounded-lg ${
                      message.role === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}
                  />
                  <Skeleton
                    className={`h-3 w-16 mt-1 ${
                      message.role === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-border px-4 py-2">
        <div className="flex w-full space-x-2">
          <Skeleton className="flex-grow h-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </CardFooter>
    </>
  );
};

export default ChatBodySkeleton;

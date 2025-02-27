import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreVertical, Phone, Search, Video } from 'lucide-react';

const ChatHeaderSkeleton = () => {
  return (
    <CardHeader className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" disabled>
            <Search className="h-5 w-5 text-muted-foreground/50" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Phone className="h-5 w-5 text-muted-foreground/50" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Video className="h-5 w-5 text-muted-foreground/50" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <MoreVertical className="h-5 w-5 text-muted-foreground/50" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeaderSkeleton;

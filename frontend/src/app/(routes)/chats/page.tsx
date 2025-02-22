import { Card } from '@/components/ui/card';

import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';

export default function Chat() {
  return (
    <div className="h-screen bg-background">
      <Card className="h-full w-full shadow-none rounded-none border-0">
        <ChatHeader />
        <ChatBody />
      </Card>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <Link href="/" passHref>
          <Button variant="default" size="lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

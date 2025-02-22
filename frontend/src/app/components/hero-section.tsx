import { Button } from '@/components/ui/button';
import { ModeToggle } from './theme-toggle';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Connect Instantly with <span className="text-blue-600 dark:text-blue-400">ChatApp</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Experience seamless communication with our modern, intuitive chat platform. Stay connected
          with friends, family, and colleagues anytime, anywhere.
        </p>
        <div className="mt-10 flex justify-center items-center space-x-4">
          <Link href="/sign-in">
            <Button variant="default" size="lg">
              Sign Up
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="default" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[300px] h-[300px] bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10"></div>
      </div>
      <div className="absolute right-1/4 bottom-0 translate-y-1/2">
        <div className="w-[250px] h-[250px] bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10"></div>
      </div>
    </div>
  );
}

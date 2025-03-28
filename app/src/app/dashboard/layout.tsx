'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { BackButton } from '@/components/ui/back-button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const showBackButton = pathname !== '/dashboard';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-green-800">
                  Greenfield University
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-700 font-medium">
                Welcome, {session.user?.email}
              </span>
              <div className="flex-shrink-0">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showBackButton && (
          <div className="mb-6">
            <BackButton />
          </div>
        )}
        <div className="bg-white shadow-xl rounded-lg p-6 ring-1 ring-black/5">
          <div className="prose max-w-none prose-green prose-headings:text-green-900 prose-p:text-gray-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Greenfield University
          </h1>
          <p className="text-xl text-gray-600">
            Digital Student Registration System
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">New Students</h2>
              <p className="text-gray-600 mb-6">
                Create your account to start your academic journey with us.
              </p>
              <Link href="/registration">
                <Button className="w-full">Register Now</Button>
              </Link>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Existing Students</h2>
              <p className="text-gray-600 mb-6">
                Access your student portal to manage your academic life.
              </p>
              <Link href="/login">
                <Button className="w-full" variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h4 className="font-medium mb-2">Course Registration</h4>
                <p className="text-gray-600 text-sm">
                  Easy and quick course registration process
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-2">Document Management</h4>
                <p className="text-gray-600 text-sm">
                  Secure storage for all your academic documents
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-2">Academic Progress</h4>
                <p className="text-gray-600 text-sm">
                  Track your grades and academic achievements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

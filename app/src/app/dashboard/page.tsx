'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, GraduationCap, Upload, Bell } from 'lucide-react';
import { toast } from 'sonner';

type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  enrolled: boolean;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      credits: 3,
      enrolled: false,
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Calculus I',
      credits: 4,
      enrolled: false,
    },
    {
      id: '3',
      code: 'ENG101',
      name: 'English Composition',
      credits: 3,
      enrolled: false,
    },
  ]);

  const handleEnrollment = async (courseId: string, enroll: boolean) => {
    try {
      setLoading(courseId);
      const endpoint = enroll ? '/api/courses/enroll' : '/api/courses/unenroll';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update enrollment');
      }

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? { ...course, enrolled: enroll }
            : course
        )
      );

      toast.success(
        enroll
          ? 'Successfully enrolled in course'
          : 'Successfully unenrolled from course'
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  const quickLinks = [
    {
      name: 'Academic Calendar',
      icon: Calendar,
      onClick: () => router.push('/dashboard/calendar'),
    },
    {
      name: 'Grade Report',
      icon: GraduationCap,
      onClick: () => router.push('/dashboard/grades'),
    },
    {
      name: 'Upload Documents',
      icon: Upload,
      onClick: () => router.push('/dashboard/documents'),
    },
    {
      name: 'Notifications',
      icon: Bell,
      onClick: () => toast.info('Notifications feature coming soon!'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Student Information
          </h3>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {session?.user?.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Available Courses
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {courses.map((course) => (
                  <li key={course.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {course.code} - {course.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Credits: {course.credits}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button
                          variant={course.enrolled ? "outline" : "default"}
                          onClick={() => handleEnrollment(course.id, !course.enrolled)}
                          disabled={loading === course.id}
                        >
                          {loading === course.id ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                          ) : null}
                          {course.enrolled ? 'Drop Course' : 'Enroll'}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Quick Links
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className="justify-center"
                onClick={link.onClick}
              >
                <link.icon className="h-4 w-4 mr-2" />
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

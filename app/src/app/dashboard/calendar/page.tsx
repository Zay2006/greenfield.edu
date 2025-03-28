'use client';

import { useState } from 'react';

type Event = {
  id: string;
  title: string;
  date: string;
  type: 'class' | 'exam' | 'holiday' | 'deadline';
  description: string;
};

const academicEvents: Event[] = [
  {
    id: '1',
    title: 'Fall Semester Begins',
    date: '2025-09-01',
    type: 'class',
    description: 'First day of fall semester classes',
  },
  {
    id: '2',
    title: 'Midterm Examinations',
    date: '2025-10-15',
    type: 'exam',
    description: 'Fall semester midterm examinations begin',
  },
  {
    id: '3',
    title: 'Thanksgiving Break',
    date: '2025-11-25',
    type: 'holiday',
    description: 'No classes during Thanksgiving break',
  },
  {
    id: '4',
    title: 'Final Projects Due',
    date: '2025-12-10',
    type: 'deadline',
    description: 'Submission deadline for all final projects',
  },
];

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const filteredEvents = academicEvents.filter(
    (event) => event.date.startsWith(selectedMonth)
  );

  const eventTypeColors = {
    class: 'bg-blue-100 text-blue-800',
    exam: 'bg-red-100 text-red-800',
    holiday: 'bg-green-100 text-green-800',
    deadline: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Academic Calendar</h2>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          eventTypeColors[event.type]
                        }`}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <time className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No events scheduled for this month
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

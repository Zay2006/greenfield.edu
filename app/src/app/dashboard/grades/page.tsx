'use client';

import { useState } from 'react';

type Grade = {
  id: string;
  courseCode: string;
  courseName: string;
  grade: string;
  credits: number;
  semester: string;
};

const semesters = [
  'Fall 2024',
  'Spring 2025',
  'Fall 2025',
];

const grades: Grade[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    grade: 'A',
    credits: 3,
    semester: 'Fall 2024',
  },
  {
    id: '2',
    courseCode: 'MATH201',
    courseName: 'Calculus I',
    grade: 'B+',
    credits: 4,
    semester: 'Fall 2024',
  },
  {
    id: '3',
    courseCode: 'ENG101',
    courseName: 'English Composition',
    grade: 'A-',
    credits: 3,
    semester: 'Spring 2025',
  },
];

const calculateGPA = (grades: Grade[]): number => {
  const gradePoints: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((grade) => {
    if (grade.grade in gradePoints) {
      totalPoints += gradePoints[grade.grade] * grade.credits;
      totalCredits += grade.credits;
    }
  });

  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
};

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState<string>('all');

  const filteredGrades = selectedSemester === 'all'
    ? grades
    : grades.filter(grade => grade.semester === selectedSemester);

  const currentGPA = calculateGPA(filteredGrades);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Grade Report</h2>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900">{currentGPA}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {grade.courseCode}
                          </div>
                          <div className="text-sm text-gray-500">
                            {grade.courseName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {grade.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

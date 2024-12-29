import React, { useState, useEffect } from "react";
import { Search, BarChart2 } from "lucide-react";

const dummyStudents = [
  {
    id: "ETS001/14",
    name: "Alice Johnson",
    entryTime: "2023-06-01T09:15:00",
    exitTime: "2023-06-01T14:30:00",
  },
  {
    id: "ETS002/14",
    name: "Bob Smith",
    entryTime: "2023-06-01T10:00:00",
    exitTime: "2023-06-01T16:45:00",
  },
  {
    id: "ETS003/14",
    name: "Charlie Brown",
    entryTime: "2023-06-01T11:30:00",
    exitTime: "2023-06-01T15:20:00",
  },
  {
    id: "ETS004/14",
    name: "Diana Ross",
    entryTime: "2023-06-01T13:00:00",
    exitTime: "2023-06-01T17:00:00",
  },
  {
    id: "ETS005/14",
    name: "Ethan Hunt",
    entryTime: "2023-06-01T14:15:00",
    exitTime: "2023-06-01T18:30:00",
  },
  {
    id: "ETS006/14",
    name: "Fiona Apple",
    entryTime: "2023-06-02T09:30:00",
    exitTime: "2023-06-02T12:45:00",
  },
  {
    id: "ETS007/14",
    name: "George Michael",
    entryTime: "2023-06-02T10:45:00",
    exitTime: "2023-06-02T14:15:00",
  },
  {
    id: "ETS008/14",
    name: "Hannah Montana",
    entryTime: "2023-06-02T11:00:00",
    exitTime: "2023-06-02T16:30:00",
  },
  {
    id: "ETS009/14",
    name: "Ian McKellen",
    entryTime: "2023-06-02T13:30:00",
    exitTime: "2023-06-02T17:45:00",
  },
  {
    id: "ETS010/14",
    name: "Julia Roberts",
    entryTime: "2023-06-02T15:00:00",
    exitTime: "2023-06-02T18:00:00",
  },
];

const StudentsList = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const studentsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm)
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const calculateDuration = (entryTime, exitTime) => {
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const durationMs = exit - entry;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const generateReport = () => {
    const uniqueUsersByDay = {};
    const usageHours = Array(24).fill(0);
    const booksBorrowedByDay = {};

    students.forEach((student) => {
      const entryDate = new Date(student.entryTime).toDateString();
      const exitDate = new Date(student.exitTime).toDateString();

      // Count unique users per day
      if (!uniqueUsersByDay[entryDate]) uniqueUsersByDay[entryDate] = new Set();
      uniqueUsersByDay[entryDate].add(student.id);

      // Track usage hours
      const entryHour = new Date(student.entryTime).getHours();
      const exitHour = new Date(student.exitTime).getHours();
      for (let i = entryHour; i <= exitHour; i++) {
        usageHours[i]++;
      }

      // Simulate books borrowed (random number between 0 and 3)
      const booksBorrowed = Math.floor(Math.random() * 4);
      if (!booksBorrowedByDay[entryDate]) booksBorrowedByDay[entryDate] = 0;
      booksBorrowedByDay[entryDate] += booksBorrowed;
    });

    const peakHour = usageHours.indexOf(Math.max(...usageHours));


    return {
      uniqueUsers: Object.entries(uniqueUsersByDay).map(([date, users]) => ({
        date,
        count: users.size,
      })),
      peakHour,
      booksBorrowed: Object.entries(booksBorrowedByDay).map(
        ([date, count]) => ({ date, count })
      ),
    };
  };

  const report = generateReport();

  return (
    <div className="p-6 h-[100vh] overflow-y-auto scrollbar-hide">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
        <p className="text-gray-600 mt-2">
          Track student entries and exits from the library
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowReport(!showReport)}
          className="ml-4 px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#234678] transition-colors duration-200 flex items-center"
        >
          <BarChart2 className="mr-2 h-5 w-5" />
          {showReport ? "Hide Report" : "Show Report"}
        </button>
      </div>

      {/* Students List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Entry Time</th>
              <th className="py-2 px-4 border-b text-left">Exit Time</th>
              <th className="py-2 px-4 border-b text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">
                  {formatTime(student.entryTime)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatTime(student.exitTime)}
                </td>
                <td className="py-2 px-4 border-b">
                  {calculateDuration(student.entryTime, student.exitTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {Array.from(
          { length: Math.ceil(filteredStudents.length / studentsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#1a365d] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>


      {/* Usage Analysis Report */}
      {showReport && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Usage Analysis Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Unique Users per Day
              </h3>
              <ul className="space-y-2">
                {report.uniqueUsers.map(({ date, count }) => (
                  <li key={date} className="flex justify-between items-center">
                    <span>{date}:</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Peak Usage Hour</h3>
              <p className="text-2xl font-bold">{report.peakHour}:00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Books Borrowed per Day
              </h3>
              <ul className="space-y-2">
                {report.booksBorrowed.map(({ date, count }) => (
                  <li key={date} className="flex justify-between items-center">
                    <span>{date}:</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;

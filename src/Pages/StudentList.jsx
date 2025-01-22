import React, { useState, useEffect } from "react";
import { Search, BarChart2, Clock, Book, UserCheck } from "lucide-react";

const dummyStudents = [
  {
    id: "ETS0125/14",
    name: "Edom Mulugeta",
    entryTime: "2023-06-01T09:15:00",
    exitTime: "2023-06-01T14:30:00",
    status: "borrowed",
    image: "https://i.pravatar.cc/150?img=1",
    totalHours: 120,
    booksBorrowed: 5,
  },
  {
    id: "ETS0245/14",
    name: "Lidya Kebede",
    entryTime: "2023-06-01T10:00:00",
    exitTime: null,
    status: "none",
    image: "https://i.pravatar.cc/150?img=10",
    totalHours: 85,
    booksBorrowed: 3,
  },
  {
    id: "ETS0874/14",
    name: "Nahom Mulugeta",
    entryTime: "2023-06-01T11:30:00",
    exitTime: "2023-06-01T15:20:00",
    status: "none",
    image: "https://i.pravatar.cc/150?img=4",
    totalHours: 95,
    booksBorrowed: 4,
  },
  {
    id: "ETS0479/14",
    name: "Ililli Juhar",
    entryTime: "2023-06-01T13:00:00",
    exitTime: null,
    status: "borrowed",
    image: "https://i.pravatar.cc/150?img=5",
    totalHours: 110,
    booksBorrowed: 6,
  },
  {
    id: "ETS0510/14",
    name: "Betselot Tesfa",
    entryTime: "2023-06-01T14:15:00",
    exitTime: "2023-06-01T18:30:00",
    status: "borrowed",
    image: "https://i.pravatar.cc/150?img=30",
    totalHours: 75,
    booksBorrowed: 2,
  },
  {
    id: "ETS0126/14",
    name: "Abel Temesgen",
    entryTime: "2023-06-02T09:30:00",
    exitTime: "2023-06-02T12:45:00",
    status: "none",
    image: "https://i.pravatar.cc/150?img=8",
    totalHours: 100,
    booksBorrowed: 4,
  },
  {
    id: "ETS0712/14",
    name: "Eyosiyas Kebede",
    entryTime: "2023-06-02T10:45:00",
    exitTime: null,
    status: "none",
    image: "https://i.pravatar.cc/150?img=11",
    totalHours: 130,
    booksBorrowed: 7,
  },
  {
    id: "ETS0824/14",
    name: "Yohana Mekuria",
    entryTime: "2023-06-02T11:00:00",
    exitTime: "2023-06-02T16:30:00",
    status: "none",
    image: "https://i.pravatar.cc/150?img=10",
    totalHours: 90,
    booksBorrowed: 3,
  },
  {
    id: "ETS0329/14",
    name: "Abem Tigist",
    entryTime: "2023-06-02T13:30:00",
    exitTime: null,
    status: "borrowed",
    image: "https://i.pravatar.cc/150?img=40",
    totalHours: 105,
    booksBorrowed: 5,
  },
  {
    id: "ETS0541/14",
    name: "Biruh Ayele",
    entryTime: "2023-06-02T15:00:00",
    exitTime: "2023-06-02T18:00:00",
    status: "borrowed",
    image: "https://i.pravatar.cc/150?img=12",
    totalHours: 80,
    booksBorrowed: 2,
  },
];

const StudentsList = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReport, setShowReport] = useState(true);
  const studentsPerPage = 6;

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
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const calculateDuration = (entryTime, exitTime) => {
    if (!exitTime) return "Still in library";
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const durationMs = exit - entry;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-200 text-green-800";
      case "borrowed":
        return "bg-yellow-200 text-yellow-800";
      case "not active":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const generateReport = () => {
    const uniqueUsersByDay = {};
    const usageHours = Array(24).fill(0);
    const booksBorrowedByDay = {};
    const visitDurations = [];

    students.forEach((student) => {
      const entryDate = new Date(student.entryTime).toDateString();
      const exitDate = student.exitTime
        ? new Date(student.exitTime).toDateString()
        : entryDate;

      // Count unique users per day
      if (!uniqueUsersByDay[entryDate]) uniqueUsersByDay[entryDate] = new Set();
      uniqueUsersByDay[entryDate].add(student.id);

      // Track usage hours
      const entryHour = new Date(student.entryTime).getHours();
      const exitHour = student.exitTime
        ? new Date(student.exitTime).getHours()
        : 23;
      for (let i = entryHour; i <= exitHour; i++) {
        usageHours[i]++;
      }

      // Use actual books borrowed data
      if (!booksBorrowedByDay[entryDate]) booksBorrowedByDay[entryDate] = 0;
      booksBorrowedByDay[entryDate] += student.booksBorrowed;

      // Calculate visit duration
      if (student.exitTime) {
        const entry = new Date(student.entryTime);
        const exit = new Date(student.exitTime);
        visitDurations.push((exit - entry) / (1000 * 60 * 60));
      }
    });

    const peakHour = usageHours.indexOf(Math.max(...usageHours));
    const averageDuration =
      visitDurations.length > 0
        ? visitDurations.reduce((a, b) => a + b, 0) / visitDurations.length
        : 0;
    const longestVisit =
      visitDurations.length > 0
        ? {
            duration: Math.max(...visitDurations),
            student: students.find(
              (s) =>
                (new Date(s.exitTime) - new Date(s.entryTime)) /
                  (1000 * 60 * 60) ===
                Math.max(...visitDurations)
            ),
          }
        : { duration: 0, student: null };
    const shortestVisit =
      visitDurations.length > 0
        ? {
            duration: Math.min(...visitDurations),
            student: students.find(
              (s) =>
                (new Date(s.exitTime) - new Date(s.entryTime)) /
                  (1000 * 60 * 60) ===
                Math.min(...visitDurations)
            ),
          }
        : { duration: 0, student: null };
    const studentVisits = {};
    students.forEach((student) => {
      studentVisits[student.id] = (studentVisits[student.id] || 0) + 1;
    });
    const mostFrequentVisitor = Object.entries(studentVisits).sort(
      ([, a], [, b]) => b - a
    )[0];
    const mostFrequentVisitorStudent = students.find(
      (student) => student.id === mostFrequentVisitor[0]
    );
    const totalUniqueVisitors = new Set(students.map((student) => student.id))
      .size;

    return {
      uniqueUsers: Object.entries(uniqueUsersByDay).map(([date, users]) => ({
        date,
        count: users.size,
      })),
      peakHour,
      booksBorrowed: Object.entries(booksBorrowedByDay).map(
        ([date, count]) => ({ date, count })
      ),
      averageDuration,
      longestVisit,
      shortestVisit,
      mostFrequentVisitor: {
        student: mostFrequentVisitorStudent,
        visits: Number.parseInt(mostFrequentVisitor[1]),
      },
      totalUniqueVisitors,
    };
  };

  const report = generateReport();

  const lastCheckedInStudent = students.find(
    (student) => student.exitTime === null
  );

  const date = new Date();
  const current = date.getUTCDate();
  return (
    <div className="p-6 h-[100vh] overflow-y-auto scrollbar-hide bg-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1a365d]">Students List</h1>
        <p className="text-gray-600 mt-2">
          Track student entries and exits from the library
        </p>
      </div>

      {/* Last Checked In Student Card */}
      {lastCheckedInStudent && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
            Last Checked In Student
          </h2>
          <div className="flex items-center">
            <img
              src={lastCheckedInStudent.image || "/placeholder.svg"}
              alt={lastCheckedInStudent.name}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#1a365d]">
                {lastCheckedInStudent.name}
              </h3>
              <p className="text-gray-600">{lastCheckedInStudent.id}</p>
              <p className="mt-2 flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-semibold">Checked In: </span>
                <span className="ml-2">{formatTime(current)}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col"
          >
            <div className="flex items-center p-4 border-b">
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#1a365d]">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-600">{student.id}</p>
              </div>
              <div
                className={`ml-auto px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  student.status
                )}`}
              >
                {student.status}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Entry: </span>
                  <span className="ml-2">{formatTime(student.entryTime)}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Exit: </span>
                  <span className="ml-2">{formatTime(student.exitTime)}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Last Visit Duration: </span>
                  <span className="ml-2">
                    {calculateDuration(student.entryTime, student.exitTime)}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Total Hours: </span>
                  <span className="ml-2">{student.totalHours}h</span>
                </p>
                <p className="flex items-center">
                  <Book className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Books Borrowed: </span>
                  <span className="ml-2">{student.booksBorrowed}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {Array.from(
          { length: Math.ceil(filteredStudents.length / studentsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#1a365d] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors duration-200`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Usage Analysis Report */}
      {showReport && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#1a365d]">
            Usage Analysis Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Unique Users per Day
              </h3>
              <ul className="space-y-2">
                {report.uniqueUsers.map(({ date, count }) => (
                  <li
                    key={date}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span className="text-gray-600">{date}: </span>
                    <span className="font-semibold text-[#1a365d]">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Peak Usage Hour
              </h3>
              <p className="text-4xl font-bold text-[#1a365d]">
                {report.peakHour}:00
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Books Borrowed per Day
              </h3>
              <ul className="space-y-2">
                {report.booksBorrowed.map(({ date, count }) => (
                  <li
                    key={date}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span className="text-gray-600">{date}: </span>
                    <span className="font-semibold text-[#1a365d]">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Average Visit Duration
              </h3>
              <p className="text-4xl font-bold text-[#1a365d]">
                {report.averageDuration.toFixed(2)} hours
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Longest Visit
              </h3>
              <p className="text-sm">
                <span className="font-semibold">
                  {report.longestVisit.student.name}
                </span>
                <br />
                Duration: {report.longestVisit.duration.toFixed(2)} hours
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Shortest Visit
              </h3>
              <p className="text-sm">
                <span className="font-semibold">
                  {report.shortestVisit.student.name}
                </span>
                <br />
                Duration: {report.shortestVisit.duration.toFixed(2)} hours
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Most Frequent Visitor
              </h3>
              <p className="text-sm">
                <span className="font-semibold">
                  {report.mostFrequentVisitor.student.name}
                </span>
                <br />
                Visits: {report.mostFrequentVisitor.visits}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a365d]">
                Total Unique Visitors
              </h3>
              <p className="text-4xl font-bold text-[#1a365d]">
                {report.totalUniqueVisitors}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;

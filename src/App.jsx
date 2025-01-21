import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import LibrarianLayout from "./Layout/LibrarianLayout"
import Lend from "./Pages/Lend"
import LentList from "./Pages/LentList"
import StudentList from "./Pages/StudentList"
import Setting from "./Pages/Setting"
import Books from "./Pages/Books"
import BookReturn from "./Pages/BookReturn"
import LentHistory from "./Pages/LentHistory"
import Login from "./Pages/Login"

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <LibrarianLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/books" element={<Books />} />
          <Route path="/lent-list" element={<LentList />} />
          <Route path="/returns" element={<BookReturn />} />
          <Route path="/history" element={<LentHistory />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App


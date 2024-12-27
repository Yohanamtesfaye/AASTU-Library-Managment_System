import Sidebar from "./Component/Sidebar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import LibrarianLayout from "./Layout/LibrarianLayout"
import Lend from "./Pages/Lend"
import LentList from "./Pages/LentList"
import StudentList from "./Pages/StudentList"
import Setting from "./Pages/Setting"
import Books from "./Pages/Books"
import BookReturn from "./Pages/BookReturn"
import LentHistory from "./Pages/LentHistory"
function App() {

  return (
    <>
      <div>
        <Router>
          <Routes >
            <Route element={<LibrarianLayout />} >
              <Route path="/" element={<Dashboard/>} />
              <Route path="/lend" element={<Lend />} />
              <Route path="/books" element={<Books />} />
              <Route path="/lent-list" element={<LentList />} />
              <Route path="/returns" element={<BookReturn />} />
              <Route path="/history" element={<LentHistory />} />
              <Route path="/student-list" element={<StudentList />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App

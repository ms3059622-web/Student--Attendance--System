import { useState } from "react";
import "./App.css";

function StatCard({ title, value, icon, color }) {
return (
<div className={"stat-card ${color}"}>
<span className="stat-icon">{icon}</span>
<div>
<p>{title}</p>
<h2>{value}</h2>
</div>
</div>
);
}

function App() {
const [students, setStudents] = useState([
{ id: 1, name: "Ayesha Khan", roll: "101", status: "Present" },
{ id: 2, name: "Rahul Sharma", roll: "102", status: "Absent" },
{ id: 3, name: "Priya Patel", roll: "103", status: "Present" },
{ id: 4, name: "Arjun Singh", roll: "104", status: "Present" },
{ id: 5, name: "Sara Shaikh", roll: "105", status: "Absent" }
]);

const [search, setSearch] = useState("");
const [newName, setNewName] = useState("");
const [newRoll, setNewRoll] = useState("");
const [activePage, setActivePage] = useState("Dashboard");

const total = students.length;

const present = students.filter(
(student) => student.status === "Present"
).length;

const absent = students.filter(
(student) => student.status === "Absent"
).length;

const attendance = total
? Math.round((present / total) * 100)
: 0;

function markAttendance(id, status) {
setStudents((previousStudents) =>
previousStudents.map((student) =>
student.id === id ? { ...student, status } : student
)
);
}

function addStudent(event) {
event.preventDefault();

if (!newName.trim() || !newRoll.trim()) {
  alert("Please enter the student name and roll number.");
  return;
}

if (students.some((student) => student.roll === newRoll.trim())) {
  alert("This roll number already exists.");
  return;
}

setStudents((previousStudents) => [
  ...previousStudents,
  {
    id: Date.now(),
    name: newName.trim(),
    roll: newRoll.trim(),
    status: "Not Marked"
  }
]);

setNewName("");
setNewRoll("");

}

function deleteStudent(id) {
if (window.confirm("Do you want to delete this student?")) {
setStudents((previousStudents) =>
previousStudents.filter((student) => student.id !== id)
);
}
}

const filteredStudents = students.filter(
(student) =>
student.name.toLowerCase().includes(search.toLowerCase()) ||
student.roll.toLowerCase().includes(search.toLowerCase())
);

return (
<div className="app-layout">
<aside className="sidebar">
<div className="brand">
<div className="brand-icon">A</div>
<div>
<h2>Attendify</h2>
<span>Student Management</span>
</div>
</div>

    <p className="menu-label">MAIN MENU</p>

    {["Dashboard", "Students", "Attendance", "Reports"].map((page) => (
      <button
        key={page}
        className={`menu-item ${activePage === page ? "active" : ""}`}
        onClick={() => setActivePage(page)}
      >
        <span>
          {{
            Dashboard: "🏠",
            Students: "👩‍🎓",
            Attendance: "📋",
            Reports: "📊"
          }[page]}
        </span>
        {page}
      </button>
    ))}

    <div className="sidebar-bottom">
      <div className="profile-avatar">MS</div>
      <div>
        <strong>Student Admin</strong>
        <p>College Dashboard</p>
      </div>
    </div>
  </aside>

  <main className="main-content">
    <header className="topbar">
      <div>
        <p className="date-label">STUDENT MANAGEMENT SYSTEM</p>
        <h1>
          {activePage === "Dashboard"
            ? "Welcome to Attendify! 💗"
            : activePage}
        </h1>
        <p className="subtitle">
          Manage your students and attendance in one place.
        </p>
      </div>
      <div className="top-avatar">MS</div>
    </header>

    <section className="stats-grid">
      <StatCard title="Total Students" value={total} icon="👩‍🎓" color="pink" />
      <StatCard title="Present Today" value={present} icon="✅" color="purple" />
      <StatCard title="Absent Today" value={absent} icon="❌" color="peach" />
      <StatCard title="Attendance Rate" value={`${attendance}%`} icon="📈" color="blue" />
    </section>

    <section className="overview-grid">
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Attendance Overview</h2>
            <p>Today's class attendance</p>
          </div>
          <span className="live-badge">● LIVE</span>
        </div>

        <div className="progress-area">
          <div
            className="progress-ring"
            style={{
              background: `conic-gradient(#a855f7 ${attendance * 3.6}deg, #f2e8ff 0deg)`
            }}
          >
            <div className="ring-inner">
              <h2>{attendance}%</h2>
              <span>Attendance</span>
            </div>
          </div>

          <div className="legend">
            <p><span className="dot present-dot"></span> Present <strong>{present}</strong></p>
            <p><span className="dot absent-dot"></span> Absent <strong>{absent}</strong></p>
            <p><span className="dot unmarked-dot"></span> Not Marked <strong>{total - present - absent}</strong></p>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Quick Summary ✨</h2>
            <p>Your classroom at a glance</p>
          </div>
        </div>

        <div className="summary-box">
          <span>👩‍🎓</span>
          <div>
            <strong>{total} Students</strong>
            <p>Currently registered</p>
          </div>
        </div>

        <div className="summary-box">
          <span>💖</span>
          <div>
            <strong>{attendance >= 75 ? "Great Attendance!" : "Attendance Update"}</strong>
            <p>{attendance}% of students are present</p>
          </div>
        </div>
      </div>
    </section>

    {activePage === "Students" && (
      <section className="panel">
        <h2>➕ Add New Student</h2>
        <form className="add-form" onSubmit={addStudent}>
          <input
            placeholder="Student name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <input
            placeholder="Roll number"
            value={newRoll}
            onChange={(event) => setNewRoll(event.target.value)}
          />
          <button className="add-button" type="submit">+ Add Student</button>
        </form>
      </section>
    )}

    <section className="panel student-panel">
      <div className="panel-heading student-heading">
        <div>
          <h2>
            {activePage === "Reports"
              ? "Student Attendance Report"
              : activePage === "Attendance"
              ? "Mark Attendance"
              : "Student Directory"}
          </h2>
          <p>View and manage your student records</p>
        </div>

        <input
          className="search-input"
          placeholder="🔍 Search students..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>ROLL NO.</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="student-name">
                    <div className="student-avatar">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <strong>{student.name}</strong>
                  </div>
                </td>

                <td>#{student.roll}</td>

                <td>
                  <span className={`status-badge ${
                    student.status === "Present"
                      ? "status-present"
                      : student.status === "Absent"
                      ? "status-absent"
                      : "status-unmarked"
                  }`}>
                    {student.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="present-button"
                      onClick={() => markAttendance(student.id, "Present")}
                    >
                      Present
                    </button>
                    <button
                      className="absent-button"
                      onClick={() => markAttendance(student.id, "Absent")}
                    >
                      Absent
                    </button>

                    {activePage === "Students" && (
                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student.id)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-message">
                  No students found. Try another search! 💗
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filteredStudents.length} of {total} students
      </div>
    </section>

    <footer>
      Made with 💗 using React.js | Attendify Student Dashboard
    </footer>
  </main>
</div>

);
}

export default App;
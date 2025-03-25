import "./App.css"
import { AuthProvider} from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import Landing from "./pages/Landing"
// import Login from "./pages/auth/Login"
// import Register from "./pages/auth/Register"
// import MemberPage from "./pages/member/MemberPage"
// import AdminPage from "./pages/admin/AdminPage"
// import NotFound from "./pages/NotFound"
// 
// 
// import ProtectedRoute from "./components/ProtectedRoute"

// // function ProtectedRoute({ children, roles = [] }) {
// //   const { user, loading } = useAuth()

// //   if (loading) {
// //     return <div className="loading">Loading...</div>
// //   }

// //   if (!user || (roles.length > 0 && !roles.includes(user.role))) {
// //     return <Navigate to="/login" replace />
// //   }

// //   return children
// // }

function App() {
  return (
    <AuthProvider>    
      <Dashboard/>
    </AuthProvider>
  )
}
  //     <Router>
  //       <Routes>
  //         {/* Public routes */}
  //         <Route path="/" element={<Landing />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register" element={<Register />} />
  //         {/* <Route path="/forgot-password" element={<ForgotPassword />} />
  //         <Route path="/reset-password" element={<ResetPassword />} /> */}

  //         {/* Member routes */}
  //         <Route
  //           path="/member/*"
  //           element={
  //             <ProtectedRoute roles={["member", "staff"]}>
  //               <MemberPage/>
  //               {/* <Routes>
  //                 <Route path="/" element={<MemberDashboard />} />
  //                 <Route path="*" element={<NotFound />} />
  //               </Routes> */}
  //             </ProtectedRoute>
  //           }
  //         />

  //         {/* Admin routes */}
  //         <Route
  //           path="/admin/*"
  //           element={
  //             <ProtectedRoute roles={["staff"]}>
  //               <AdminPage/>
  //               {/* <Routes>
  //                 <Route path="/" element={<AdminDashboard />} />
  //                 <Route path="/books" element={<BookManagement />} />
  //                 <Route path="/users" element={<UserManagement />} />
  //                 <Route path="/circulation" element={<CirculationManagement />} />
  //                 <Route path="*" element={<NotFound />} />
  //               </Routes> */}
  //             </ProtectedRoute>
  //           }
  //         />

  //         {/* 404 route */}
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </Router>

  // )


export default App


// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/global.css"; // Assuming this path is correct for your global CSS
import ProtectedRoute from "./components/ProtecteRoute";
// Import all your page components
import Landing from "./pages/Landing";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddEditEvent from "./pages/admin/AddEditEvent";
import ManageEvents from "./pages/admin/ManageEvents";
import Profile from "./pages/admin/Profile";
import TrackAttendees from "./pages/admin/TrackAttendees";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Events";
import RegistrationForm from "./pages/RegistrationForm";
import Societies from "./pages/societies";
import SocietiesDetail from "./pages/SocietiesDetail"; // Corrected casing for consistency if needed, assuming the file is 'Societies.jsx'
// import PastEvents from "./pages/Pastevents"; // <--- ADD THIS IMPORT

function App() {
  return (
    <Routes>
      {/* Public/Landing Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event-detail/:id" element={<EventDetail />} />
      <Route path="/registration-form" element={<RegistrationForm />} />
      <Route path="/societies" element={<Societies />} />
      <Route path="/society-detail/:id" element={<SocietiesDetail />} />{" "}
      {/* NEW ROUTE */}
      {/* <Route path="/past-events" element={<PastEvents />} /> This line needs the import above */}
      {/* Admin Panel Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-edit-event"
        element={
          <ProtectedRoute>
            <AddEditEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-edit-event/:id"
        element={
          <ProtectedRoute>
            <AddEditEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-events"
        element={
          <ProtectedRoute>
            <ManageEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/track-attendees"
        element={
          <ProtectedRoute>
            <TrackAttendees />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protected-route.jsx";
import Layout from "./components/layout";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import GoogleSuccess from "./pages/google-success.jsx";
import Dashboard from "./pages/dashboard.jsx";
import OwnersPage from "./pages/owners";
import TeamsPage from "./pages/teams";
import TeamDetailPage from "./pages/team-detail.jsx";
import PlayersPage from "./pages/players";
import SponsorsPage from "./pages/sponsors";
import BroadcastersPage from "./pages/broadcasters";
import TeamSponsorsPage from "./pages/team-sponsors";
import TeamBroadcastersPage from "./pages/team-broadcasters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/owners" element={<OwnersPage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/teams/:id" element={<TeamDetailPage />} />
                  <Route path="/players" element={<PlayersPage />} />
                  <Route path="/sponsors" element={<SponsorsPage />} />
                  <Route path="/broadcasters" element={<BroadcastersPage />} />
                  <Route path="/team-sponsors" element={<TeamSponsorsPage />} />
                  <Route path="/team-broadcasters" element={<TeamBroadcastersPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

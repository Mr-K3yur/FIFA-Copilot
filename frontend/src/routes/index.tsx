import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import FanDashboard from '../pages/dashboards/FanDashboard';
import OrganizerDashboard from '../pages/dashboards/OrganizerDashboard';
import AnalyticsDashboard from '../pages/dashboards/AnalyticsDashboard';
import { 
  VolunteerDashboard, 
  SecurityDashboard 
} from '../pages/dashboards/RoleDashboards';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    // Fan Route
    element: <ProtectedRoute allowedRoles={['Fan']} />,
    children: [
      { path: "/fan", element: <FanDashboard /> }
    ]
  },
  {
    // Organizer Route
    element: <ProtectedRoute allowedRoles={['Organizer']} />,
    children: [
      { path: "/organizer", element: <OrganizerDashboard /> },
      { path: "/analytics", element: <AnalyticsDashboard /> }
    ]
  },
  {
    // Volunteer Route
    element: <ProtectedRoute allowedRoles={['Volunteer']} />,
    children: [
      { path: "/volunteer", element: <VolunteerDashboard /> }
    ]
  },
  {
    // Security Route
    element: <ProtectedRoute allowedRoles={['Security']} />,
    children: [
      { path: "/security", element: <SecurityDashboard /> }
    ]
  }
]);

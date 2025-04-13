import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";

import Loader from "@/components/Loader";
import constants from "./constants/constants";

// const Home = lazy(() => import("@/views/Home"));
const Projects = lazy(() => import("@/views/Projects"));
const Login = lazy(() => import("@/views/Login"));
const About = lazy(() => import("@/views/About"));
const ProjectDetails = lazy(() => import("@/views/Projects/ProjectDetails"));
const Visualisations = lazy(() => import("@/views/Visualisations"));
const ConfigureViz = lazy(() => import("@/views/Visualisations/ConfigureViz"));
const Dashboards = lazy(() => import("@/views/Dashboards"));
const ConfigureDashboards = lazy(() => import("@/views/Dashboards/Configure"));
const ViewDashboard = lazy(() => import("@/views/Dashboards/View"));

const {
  PERSONAS: { ADMIN, USER },
  VIEW_MODES: { EDIT, CREATE },
} = constants;

const Router: FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path='/projects' element={<Projects persona={ADMIN} />} />
        <Route path='/user/projects' element={<Projects persona={USER} />} />
        <Route
          path='/projects/:projectId/visualisations/create'
          element={<ConfigureViz mode={CREATE} />}
        />
        <Route
          path='/projects/:projectId/visualisations/:vizId'
          element={<ConfigureViz mode={EDIT} />}
        />
        <Route path='/projects/:projectId/visualisations' element={<Visualisations />} />
        <Route
          path='/projects/:projectId/dashboards/create'
          element={<ConfigureDashboards mode={CREATE} />}
        />
        <Route
          path='/projects/:projectId/dashboards/:dashboardId'
          element={<ConfigureDashboards mode={EDIT} />}
        />
        <Route
          path='/user/projects/:projectId/dashboards/:dashboardId'
          element={<ViewDashboard />}
        />
        <Route path='/projects/:projectId/dashboards' element={<Dashboards persona={ADMIN} />} />
        <Route
          path='/user/projects/:projectId/dashboards'
          element={<Dashboards persona={USER} />}
        />
        <Route path='/projects/:projectId' element={<ProjectDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Navigate to='/projects' />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

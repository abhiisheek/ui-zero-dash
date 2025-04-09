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

const Router: FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path='/projects' element={<Projects />} />
        <Route
          path='/projects/:projectId/visualisations/create'
          element={<ConfigureViz mode={constants.VIEW_MODES.CREATE} />}
        />
        <Route
          path='/projects/:projectId/visualisations/:vizId'
          element={<ConfigureViz mode={constants.VIEW_MODES.EDIT} />}
        />
        <Route path='/projects/:projectId/visualisations' element={<Visualisations />} />
        <Route
          path='/projects/:projectId/dashboards/create'
          element={<ConfigureDashboards mode={constants.VIEW_MODES.CREATE} />}
        />
        {/* <Route
          path='/projects/:projectId/dashboards/:dashboardId'
          element={<ConfigureViz mode={constants.VIEW_MODES.EDIT} />}
        /> */}
        <Route path='/projects/:projectId/dashboards' element={<Dashboards />} />
        <Route path='/projects/:projectId' element={<ProjectDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Navigate to='/projects' />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

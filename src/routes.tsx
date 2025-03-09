import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";

import Loader from "@/components/Loader";

// const Home = lazy(() => import("@/views/Home"));
const Projects = lazy(() => import("@/views/Projects"));
const Login = lazy(() => import("@/views/Login"));
const About = lazy(() => import("@/views/About"));
const ProjectDetails = lazy(() => import("@/views/Projects/ProjectDetails"));
const Visualisations = lazy(() => import("@/views/Visualisations"));

const Router: FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:projectId/visualisations' element={<Visualisations />} />
        <Route path='/projects/:projectId' element={<ProjectDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Navigate to='/projects' />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

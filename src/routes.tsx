import {FC, lazy, Suspense} from "react";
import {Routes, Route, Navigate} from "react-router";

import Loader from "@/components/Loader";

const Home = lazy(() => import("@/views/Home"));
const Login = lazy(() => import("@/views/Login"));
const About = lazy(() => import("@/views/About"));

const Router: FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
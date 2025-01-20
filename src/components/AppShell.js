import React, { lazy, useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Helmet } from "react-helmet";

// Lazy components
const AppToolbar = lazy(() => import("./AppToolbar"));
const CssBaseline = lazy(() => import("@mui/material/CssBaseline"));

// Lazy Pages
const Home = lazy(() => import("../home/Home"));
const Chat = lazy(() => import("../chat/Chat"));
const Planner = lazy(() => import("../planner/Planner"));
const Login = lazy(() => import("../chat/Login"));
const Signup = lazy(() => import("../chat/Signup"));
const Lego = lazy(() => import("../lego/Lego"));
const Settings = lazy(() => import("../settings/Settings"));

const AppShell = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to Firebase auth state changes

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthenticated(!!user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Update the document title on page change
  const handlePageChange = (title) => {
    if (headerTitle !== title) {
      setHeaderTitle(title);
    }
  };

  // Navigate to the selected link
  const handleDrawerLinkClicked = (link) => {
    if (location.pathname !== link) {
      navigate(link);
    }
  };

  // Private route wrapper
  const PrivateRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();

    return authenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };

  // Public route wrapper
  const PublicRoute = ({
    component: Component,
    restrictedToPublic,
    ...rest
  }) => {
    const location = useLocation();

    if (authenticated && restrictedToPublic) {
      const redirectTo = location.state?.from?.pathname || "/chat"; // Redirect to previous or default to `/chat`
      return <Navigate to={redirectTo} replace />;
    }

    return <Component {...rest} onHeaderTitle={handlePageChange} />;
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{headerTitle}</title>
        <link
          rel="canonical"
          href={`https://forr-resume.web.app/${headerTitle}`}
        />
        <meta name="description" content="Ben Forrester's React demo page" />
      </Helmet>

      <AppToolbar
        authenticated={authenticated}
        onDrawerLinkClicked={handleDrawerLinkClicked}
      />

      <main>
        <Routes>
          <Route path="/home" element={<PublicRoute component={Home} />} />
          <Route
            path="/planner"
            element={<PrivateRoute component={Planner} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute component={Settings} />}
          />
          <Route path="/chat" element={<PrivateRoute component={Chat} />} />
          <Route
            path="/signup"
            element={<PublicRoute component={Signup} restrictedToPublic />}
          />
          <Route
            path="/login"
            element={<PublicRoute component={Login} restrictedToPublic />}
          />
          <Route path="/lego" element={<PublicRoute component={Lego} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <CssBaseline />
      </main>
    </div>
  );
};

export default AppShell;

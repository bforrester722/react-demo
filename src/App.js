import React, { lazy, Suspense } from "react";

const AppShell = lazy(() => import("./components/AppShell"));

const renderLoader = () => <p>Loading...</p>;

const App = () => {
  return (
    <Suspense fallback={renderLoader()}>
      <AppShell id="AppShell" />
    </Suspense>
  );
};

export default App;

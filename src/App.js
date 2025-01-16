import React, { lazy, Suspense } from "react";

const AppShell = lazy(() => import("./components/AppShell"));

const renderLoader = () => <p>Loading...</p>;

const App = () => {
  const pages = [
    {
      index: 0,
      label: "Home",
      linkType: "public",
    },
    {
      index: 1,
      label: "Lego",
      linkType: "public",
    },
    {
      index: 2,
      label: "Chat",
      linkType: "private",
    },
    {
      index: 3,
      label: "Planner",
      linkType: "private",
    },
  ];

  return (
    <Suspense fallback={renderLoader()}>
      <AppShell id="AppShell" pages={pages} />
    </Suspense>
  );
};

export default App;

import { Suspense, lazy, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import Header from "./Header";
import SuspenseContent from "./SuspenseContent";

const Page404 = lazy(() => import("../pages/404"));

function PageContent() {
  const mainContentRef = useRef(null);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-y-auto pt-8 px-6  bg-secondary-color"
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;

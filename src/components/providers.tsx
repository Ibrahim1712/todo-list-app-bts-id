"use client";

import { Suspense } from "react";
import ReduxProvider from "./providers/redux-provider";
import LoadingSuspense from "./miscellaneous/loading-suspense";
import ReactQueryProvider from "./providers/react-query-provider";
import { RouterProvider } from "react-router-dom";
import router from "@/route";

const Providers = () => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <Suspense fallback={<LoadingSuspense />}>
          <RouterProvider router={router} />
        </Suspense>
      </ReduxProvider>
    </ReactQueryProvider>
  );
};

export default Providers;

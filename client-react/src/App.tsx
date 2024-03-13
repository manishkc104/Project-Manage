import React, { Suspense } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import ProjectListContextProvider from "./contexts/ProjectListContext";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toast";

const Explore = React.lazy(() => import("./pages/Explore"));
const CancellationList = React.lazy(() => import("./pages/CancellationList"));
const ClientsList = React.lazy(() => import("./pages/ClientsList"));

import { ApolloProvider,ApolloClient,InMemoryCache } from "@apollo/client";
import ProjectDetailsPage from "./components/ProjectDetail";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-gray-900 min-h-screen w-screen flex flex-col items-center">
        <Navbar />
        <section className="mt-16 container flex flex-col h-full flex-1 p-4 md:p-0">
          <Outlet />
        </section>
      </div>
    ),
    children: [
      { path: "/", element: <Explore /> },
      {
        path: "/cancellation-list",
        element: <CancellationList />,
      },
      {
        path: "/client-list",
        element: <ClientsList />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetailsPage/>
      }
    ],
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ApolloProvider client={client}>
      <ProjectListContextProvider>
        <RouterProvider router={router} />
        <ToastContainer delay={3000} />
      </ProjectListContextProvider>
      </ApolloProvider>
    </Suspense>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GameProvider } from "./context/GameContext";
import ErrorBoundary from "./components/ErrorBoundry";

import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const GameDetailPage = lazy(() => import("./pages/GameDetailPage"));
const AddGamePage = lazy(() => import("./pages/AddGamePage"));

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="game/:id" element={<GameDetailPage />} />
                <Route path="add" element={<AddGamePage />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;

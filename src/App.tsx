import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GameProvider } from "./context/GameContext";
import AddGamePage from "./pages/AddGamePage";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="game/:id" element={<GameDetailPage />} />
            <Route path="/add" element={<AddGamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;

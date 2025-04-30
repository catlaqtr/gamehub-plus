import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="game/:id" element={<GameDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

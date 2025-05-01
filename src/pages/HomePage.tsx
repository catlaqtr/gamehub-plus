import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { useGameContext } from "../context/GameContext";
import { useLocation } from "react-router-dom";

function HomePage() {
  type RawgGame = {
    id: number;
    name: string;
    background_image: string;
    genres: { name: string }[];
  };

  const { state, dispatch } = useGameContext();
  const location = useLocation();
  const success = location.state?.success;
  const [showSuccess, setShowSuccess] = useState(success);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=04cbcf506c184af89dd6151c7632497b")
      .then((res) => res.json())
      .then((data) => {
        const result = data.results.map((game: RawgGame) => ({
          id: game.id,
          title: game.name,
          image: game.background_image,
          genre: game.genres[0]?.name ?? "Unknown",
        }));
        dispatch({ type: "SET_GAMES", payload: result });
      });
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <div>
      <div>Home Page</div>
      {showSuccess && (
        <p className="text-green-600 font-semibold mb-4">
          Game added successfully!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.map((game) => {
          return (
            <GameCard
              id={game.id}
              title={game.title}
              image={game.image}
              genre={game.genre}
              key={game.id}
            />
          );
        })}
      </div>
    </div>
  );
}
export default HomePage;

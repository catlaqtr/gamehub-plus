import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function HomePage() {
  type Game = {
    id: number;
    title: string;
    image: string;
    genre: string;
  };
  type RawgGame = {
    id: number;
    name: string;
    background_image: string;
    genres: { name: string }[];
  };

  const [games, setGames] = useState<Game[]>([]);

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
        setGames(result);
      });
  }, []);

  return (
    <div>
      <div>Home Page</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => {
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

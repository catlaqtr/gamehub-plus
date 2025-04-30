import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameDetailPage() {
  const params = useParams();
  const gameId = Number(params.id);
  type Game = {
    id: number;
    title: string;
    image: string;
    genre: string;
  };

  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${gameId}?key=04cbcf506c184af89dd6151c7632497b`
    )
      .then((res) => res.json())
      .then((data) => {
        const result = {
          id: data.id,
          title: data.name,
          image: data.background_image,
          genre: data.genres[0]?.name ?? "Unknown",
        };

        setGame(result);
      });
  }, [gameId]);

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <img src={game.image} alt={game.title} />
      <h2>{game.title}</h2>
      <p>{game.genre}</p>
    </div>
  );
}
export default GameDetailPage;

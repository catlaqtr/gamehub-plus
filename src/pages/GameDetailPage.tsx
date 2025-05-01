import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { useEffect, useState } from "react";
import type { Game } from "../context/GameContext";

function GameDetailPage() {
  const params = useParams();
  const gameId = Number(params.id);
  const { state } = useGameContext();
  const game = state.find((g) => g.id === gameId);

  const [fullGame, setFullGame] = useState<Game | null>(null);
  const displayGame = fullGame || game;

  useEffect(() => {
    if (game && (!game.description || !game.released || !game.rating)) {
      fetch(
        `https://api.rawg.io/api/games/${gameId}?key=04cbcf506c184af89dd6151c7632497b`
      ).then((res) =>
        res.json().then((data) => {
          const result = {
            id: data.id,
            title: data.name,
            image: data.background_image,
            genre: data.genres[0]?.name ?? "Unknown",
            description: data.description_raw,
            released: data.released,
            rating: data.rating,
            playtime: data.playtime,
          };
          setFullGame(result);
        })
      );
    }
  }, [gameId, game]);

  if (!displayGame) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Link
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        to="/"
      >
        ← Back to Home
      </Link>
      <img
        className="w-full rounded-lg shadow"
        src={displayGame.image}
        alt={displayGame.title}
      />
      <h2 className="text-3xl font-bold">{displayGame.title}</h2>
      <p className="text-sm text-gray-600 italic">{displayGame.genre}</p>
      <p>{displayGame.description}</p>
      <p>
        <span className="font-semibold">Released:</span> {displayGame.released}
      </p>

      <p>
        <span className="font-semibold">Rating:</span> {displayGame.rating}
      </p>

      <p>
        <span className="font-semibold">Play time:</span> {displayGame.playtime}
      </p>
    </div>
  );
}
export default GameDetailPage;

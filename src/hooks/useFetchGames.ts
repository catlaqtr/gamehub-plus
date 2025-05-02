import { useEffect } from "react";
import { useGameContext } from "../context/GameContext";

type RawgApiGame = {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  released: string;
  rating: number;
  description_raw?: string;
};

export function useFetchGames() {
  const { dispatch } = useGameContext();

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=04cbcf506c184af89dd6151c7632497b"
        );
        const data: { results: RawgApiGame[] } = await res.json();

        const games = await Promise.all(
          data.results.map(async (game) => {
            const descRes = await fetch(
              `https://api.rawg.io/api/games/${game.id}?key=04cbcf506c184af89dd6151c7632497b`
            );
            const descData: RawgApiGame = await descRes.json();

            return {
              id: game.id,
              title: game.name,
              image: game.background_image,
              genre: game.genres[0]?.name ?? "Unknown",
              playtime: Math.floor(Math.random() * 100),
              description: descData.description_raw ?? "",
              released: descData.released,
              rating: descData.rating,
            };
          })
        );

        dispatch({ type: "SET_GAMES", payload: games });
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    }

    fetchGames();
  }, [dispatch]);
}

export default useFetchGames;

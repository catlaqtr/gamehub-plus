import { Link } from "react-router-dom";
import { memo } from "react";

type GameCardProps = {
  title: string;
  genre: string;
  image: string;
  id: number;
};
function GameCard({ title, genre, image, id }: GameCardProps) {
  return (
    <Link to={`/game/${id}`}>
      <div className="bg-white rounded shadow p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mb-2"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{genre}</p>
      </div>
    </Link>
  );
}
export default memo(GameCard);

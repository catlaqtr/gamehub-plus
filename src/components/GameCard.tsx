import { Link } from "react-router-dom";
import { memo } from "react";
type GameCardProps = {
  title: string;
  genre: string;
  image: string;
  id: number;
  description?: string;
  onViewDescription?: () => void;
};

function GameCard({
  title,
  genre,
  image,
  id,
  description,
  onViewDescription,
}: GameCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 transition hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
      <Link to={`/game/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mb-2"
        />
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 italic">{genre}</p>
      </Link>

      {description && (
        <button
          onClick={onViewDescription}
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-all"
        >
          View Description
        </button>
      )}
    </div>
  );
}

export default memo(GameCard);

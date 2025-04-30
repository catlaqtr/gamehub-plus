import { Link } from "react-router-dom";

type GameCardProps = {
  title: string;
  genre: string;
  image: string;
  id: number;
};
function GameCard({ title, genre, image, id }: GameCardProps) {
  return (
    <Link to={`/game/${id}`}>
      <div className="border rounded-lg shadow-md p-4 space-y-2">
        <img className="w-full h-40 object-cover rounded-md" src={image} />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{genre}</p>
      </div>
    </Link>
  );
}
export default GameCard;

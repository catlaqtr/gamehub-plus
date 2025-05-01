import { useForm } from "react-hook-form";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

function AddGamePage() {
  type FormData = {
    title: string;
    image: string;
    genre: string;
    description: string;
    released: string;
    rating: number;
    playtime: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { dispatch } = useGameContext();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const newGame = {
      id: Date.now(),
      title: data.title,
      image: data.image,
      genre: data.genre,
      description: data.description,
      released: data.released,
      rating: Number(data.rating),
      playtime: Number(data.playtime),
    };

    dispatch({ type: "ADD_GAME", payload: newGame });
    reset();

    setTimeout(() => {
      navigate("/", { state: { success: true } });
    }, 1500);
  };

  return (
    <div>
      <h1>Add Game</h1>
      <div className="max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              className="border w-full p-2"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Image URL</label>
            <input
              className="border w-full p-2"
              type="text"
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\//,
                  message: "Image must start with http/https",
                },
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Genre</label>
            <input
              className="border w-full p-2"
              type="text"
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              className="border w-full p-2"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Released Date</label>
            <input
              className="border w-full p-2"
              type="date"
              {...register("released", {
                required: "Release date is required",
              })}
            />
            {errors.released && (
              <p className="text-red-500 text-sm">{errors.released.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Rating</label>
            <input
              className="border w-full p-2"
              type="number"
              {...register("rating", {
                required: "Rating is required",
                min: {
                  value: 0,
                  message: "Rating cannot be less than 0",
                },
                max: {
                  value: 5,
                  message: "Rating cannot be greater than 5",
                },
              })}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Playtime (in hours)</label>
            <input
              className="border w-full p-2"
              type="number"
              {...register("playtime", {
                required: "Playtime is required",
                min: {
                  value: 1,
                  message: "Playtime must be at least 1 hour",
                },
              })}
            />
            {errors.playtime && (
              <p className="text-red-500 text-sm">{errors.playtime.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGamePage;

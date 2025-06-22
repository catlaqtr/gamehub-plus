import { useForm } from "react-hook-form";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { useId } from "react";

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

  const titleId = useId();

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">Add Game</h1>
      <div className="max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              id={titleId}
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div className="mb-4">
            <input
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="text"
              placeholder="Image URL"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>
          <div className="mb-4">
            <input
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="text"
              placeholder="Genre"
              {...register("genre", { required: true })}
            />
            {errors.genre && (
              <span className="text-red-500">Genre is required</span>
            )}
          </div>
          <div className="mb-4">
            <textarea
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>
          <div className="mb-4">
            <input
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="text"
              placeholder="Release Date (YYYY-MM-DD)"
              {...register("released", { required: true })}
            />
            {errors.released && (
              <span className="text-red-500">Release date is required</span>
            )}
          </div>
          <div className="mb-4">
            <input
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="number"
              placeholder="Rating (0-5)"
              min={0}
              max={5}
              step={0.1}
              {...register("rating", { required: true, min: 0, max: 5 })}
            />
            {errors.rating && (
              <span className="text-red-500">Rating is required (0-5)</span>
            )}
          </div>
          <div className="mb-4">
            <input
              className="border w-full p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              type="number"
              placeholder="Playtime (hours)"
              min={0}
              max={300}
              step={1}
              {...register("playtime", { required: true, min: 0 })}
            />
            {errors.playtime && (
              <span className="text-red-500">Playtime is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGamePage;

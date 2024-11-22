import { FaHeart, FaRegHeart } from "react-icons/fa";

export const columns = [
  {
    accessorKey: "id",
    header: "N°",
  },
  {
    accessorKey: "rooms",
    header: "Pièces",
  },
  {
    accessorKey: "surface",
    header: "Surf. (m²)",
  },
  {
    accessorKey: "price",
    header: "Prix €",
  },
  {
    accessorKey: "floor",
    header: "Étage",
  },
  {
    accessorKey: "favorite",
    header: "Favoris",
    cell: ({ getValue }) => {
      const isFavorite = getValue();
      return isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-500" />
      );
    },
  },
];

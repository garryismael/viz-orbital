import { SpriteScene } from "./components/SpriteScene";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdRefresh } from "react-icons/md";
import { useState } from "react";
import Filter from "./components/Filter";
import { DataTable } from "./components/Apartment/data-table";
import { useApartments } from "./hooks/useApartment";
import { columns } from "./components/Apartment/columns";

export default function App() {
  const { apartments } = useApartments();
  const initialValues = {
    surface: [0, 200],
    floor: [0, 5],
    piece: [1, 5],
    price: [0, 500000],
  };
  const [ranges, setRanges] = useState({
    ...initialValues,
  });

  const handleUpdate = (field, newRange) => {
    setRanges((prevRanges) => ({
      ...prevRanges,
      [field]: newRange,
    }));
  };

  const clear = () => {
    setRanges(initialValues);
  };

  return (
    <div className="h-screen relative">
      <Dialog className="h-screen">
        <DialogTrigger asChild>
          <button className="absolute h-20 w-11 flex items-center justify-center z-50 -translate-y-1/2 bg-gray-100 rounded-r-full top-1/2">
            <LiaAngleDoubleRightSolid size={24} />
          </button>
        </DialogTrigger>
        <DialogContent className="left-0 transform-none m-0 top-0 h-screen z-50 overflow-y-hidden max-h-screen">
          <DialogHeader>
            <DialogTitle>Liste des appartements?</DialogTitle>
            <div className="flex items-center justify-between">
              <h1 className="">25 APPARTEMENTS</h1>
              <button
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl"
                onClick={clear}>
                <MdRefresh size="24" />
                RÉINITIALISER
              </button>
            </div>
            <Filter ranges={ranges} handleUpdate={handleUpdate} />
            <DataTable columns={columns} data={apartments} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <SpriteScene />
    </div>
  );
}

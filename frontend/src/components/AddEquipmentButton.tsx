import { useState } from "react";
import AddEquipmentModal from "./AddEquipmentModal";

const AddEquipmentButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Ajouter un équipement
      </button>
      <AddEquipmentModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddEquipmentButton;

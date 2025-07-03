import { useState } from "react";
import type { CreateEquipmentInput, EquipmentType } from "../types";

interface EquipmentFormProps {
  equipmentTypes: EquipmentType[];
  onSubmit: (data: CreateEquipmentInput) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const initialState: CreateEquipmentInput = {
  name: "",
  brand: "",
  model: "",
  equipmentTypeId: 0,
};

const EquipmentForm = ({ equipmentTypes, onSubmit, onCancel, loading }: EquipmentFormProps) => {
  const [form, setForm] = useState<CreateEquipmentInput>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "equipmentTypeId" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.model || !form.equipmentTypeId) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Nom de l'équipement"
        />
      </div>
      <div>
        <label htmlFor="brand" className="block mb-1 text-sm font-medium text-gray-900">Marque</label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={form.brand}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Marque"
        />
      </div>
      <div>
        <label htmlFor="model" className="block mb-1 text-sm font-medium text-gray-900">Modèle</label>
        <input
          type="text"
          name="model"
          id="model"
          value={form.model}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Modèle"
        />
      </div>
      <div>
        <label htmlFor="equipmentTypeId" className="block mb-1 text-sm font-medium text-gray-900">Type</label>
        <select
          id="equipmentTypeId"
          name="equipmentTypeId"
          value={form.equipmentTypeId}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        >
          <option value={0}>Sélectionner un type</option>
          {equipmentTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Annuler</button>
        )}
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;

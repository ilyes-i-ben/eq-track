import { useState } from "react";
import EquipmentFilters from "./EquipmentFilters";
import EquipmentSearch from "./EquipmentSearch";
import EditEquipmentModal from "./EditEquipmentModal";
import { useArchiveWithDialog } from "../hooks/useArchiveWithDialog";
import { useDeleteWithDialog } from "../hooks/useDeleteWithDialog";
import { useEquipmentFiltersAndSearch } from "../hooks/useEquipmentFiltersAndSearch";
import { getTypeHierarchy } from "../utils";
import type { Equipment } from "../types/equipment";

function EquipmentTable() {
    const { handleArchive } = useArchiveWithDialog();
    const { handleDelete } = useDeleteWithDialog();
    const {
        loading,
        error,
        filters,
        setFilters,
        search,
        setSearch,
        options,
        filteredEquipments,
    } = useEquipmentFiltersAndSearch();

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    const openEditModal = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedEquipment(null);
    };

    if (loading) return <div>chargement...</div>;
    if (error) return <div>erreur lors du chargement des équipements.</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <EquipmentSearch value={search} onChange={setSearch} />
            <EquipmentFilters
                domaineOptions={options.domaines}
                typeOptions={options.types}
                categorieOptions={options.categories}
                sousCategorieOptions={options.sousCategories}
                filters={filters}
                onChange={setFilters}
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3">Domaine</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Catégorie</th>
                        <th scope="col" className="px-6 py-3">Sous-catégorie</th>
                        <th scope="col" className="px-6 py-3">Marque</th>
                        <th scope="col" className="px-6 py-3">Modèle</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEquipments.map((eq: Equipment) => {
                        const [domaine, type, categorie, sousCategorie] = getTypeHierarchy(eq.equipmentType);
                        return (
                            <tr
                                key={eq.id}
                                className={`border-b border-gray-200 ${eq.isDeleted
                                        ? "bg-yellow-300"
                                        : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {eq.name}
                                </th>
                                <td className="px-6 py-4">{domaine}</td>
                                <td className="px-6 py-4">{type}</td>
                                <td className="px-6 py-4">{categorie}</td>
                                <td className="px-6 py-4">{sousCategorie}</td>
                                <td className="px-6 py-4">{eq.brand}</td>
                                <td className="px-6 py-4">{eq.model}</td>
                                <td className="flex items-center px-6 py-4">
                                    <button
                                        className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => openEditModal(eq)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="font-medium text-yellow-600 hover:underline ms-3 cursor-pointer"
                                        onClick={() => handleArchive(eq)}
                                    >
                                        Archiver
                                    </button>
                                    <button
                                        className="font-medium text-red-600 hover:underline ms-3 cursor-pointer"
                                        onClick={() => handleDelete(eq)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <EditEquipmentModal
                isOpen={editModalOpen}
                onClose={closeEditModal}
                equipment={selectedEquipment}
            />
        </div>
    );
}

export default EquipmentTable;

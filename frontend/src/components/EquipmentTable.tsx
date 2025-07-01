import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_EQUIPMENTS } from "../graphql/equipment";
import type { Equipment } from "../types/equipment";
import EquipmentFilters from "./EquipmentFilters";
import EquipmentSearch from "./EquipmentSearch";
import { getTypeHierarchy } from "../utils";

function EquipmentTable() {
    const { data, loading, error } = useQuery(ALL_EQUIPMENTS);
    const [filters, setFilters] = useState({
        domaine: "",
        type: "",
        categorie: "",
        sousCategorie: "",
    });
    const [search, setSearch] = useState("");

    const options = useMemo(() => {
        if (!data?.equipments) return { domaines: [], types: [], categories: [], sousCategories: [] };
        const domaines = new Set<string>();
        const types = new Set<string>();
        const categories = new Set<string>();
        const sousCategories = new Set<string>();
        data.equipments.forEach((eq: Equipment) => {
            const [domaine, type, categorie, sousCategorie] = getTypeHierarchy(eq.equipmentType);
            if (domaine) domaines.add(domaine);
            if (type) types.add(type);
            if (categorie) categories.add(categorie);
            if (sousCategorie) sousCategories.add(sousCategorie);
        });
        return {
            domaines: Array.from(domaines),
            types: Array.from(types),
            categories: Array.from(categories),
            sousCategories: Array.from(sousCategories),
        };
    }, [data]);

    const filteredEquipments = useMemo(() => {
        if (!data?.equipments) return [];
        return data.equipments.filter((eq: Equipment) => {
            const [domaine, type, categorie, sousCategorie] = getTypeHierarchy(eq.equipmentType);
            const matchesFilters =
                (!filters.domaine || filters.domaine === domaine) &&
                (!filters.type || filters.type === type) &&
                (!filters.categorie || filters.categorie === categorie) &&
                (!filters.sousCategorie || filters.sousCategorie === sousCategorie);
            const matchesSearch =
                !search ||
                eq.brand.toLowerCase().includes(search.toLowerCase()) ||
                eq.model.toLowerCase().includes(search.toLowerCase());
            return matchesFilters && matchesSearch;
        });
    }, [data, filters, search]);

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
                            <tr key={eq.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
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
                                    <button className="font-medium text-blue-600 hover:underline cursor-pointer">Modifier</button>
                                    <button className="font-medium text-red-600 hover:underline ms-3 cursor-pointer">Supprimer</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentTable;

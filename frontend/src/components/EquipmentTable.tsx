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
        <div className="overflow-x-auto">
            <EquipmentSearch value={search} onChange={setSearch} />
            <EquipmentFilters
                domaineOptions={options.domaines}
                typeOptions={options.types}
                categorieOptions={options.categories}
                sousCategorieOptions={options.sousCategories}
                filters={filters}
                onChange={setFilters}
            />
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-1 border">Nom</th>
                        <th className="px-2 py-1 border">Domaine</th>
                        <th className="px-2 py-1 border">Type</th>
                        <th className="px-2 py-1 border">Catégorie</th>
                        <th className="px-2 py-1 border">Sous-catégorie</th>
                        <th className="px-2 py-1 border">Marque</th>
                        <th className="px-2 py-1 border">Modèle</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEquipments.map((eq: Equipment) => {
                        const [domaine, type, categorie, sousCategorie] = getTypeHierarchy(eq.equipmentType);
                        return (
                            <tr key={eq.id} className="border-t">
                                <td className="px-2 py-1 border">{eq.name}</td>
                                <td className="px-2 py-1 border">{domaine}</td>
                                <td className="px-2 py-1 border">{type}</td>
                                <td className="px-2 py-1 border">{categorie}</td>
                                <td className="px-2 py-1 border">{sousCategorie}</td>
                                <td className="px-2 py-1 border">{eq.brand}</td>
                                <td className="px-2 py-1 border">{eq.model}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentTable;

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EQUIPMENTS } from "../graphql/equipments/find";
import type { Equipment } from "../types/equipment";
import { getTypeHierarchy } from "../utils";

export function useEquipmentFiltersAndSearch() {
    const { data, loading, error, refetch } = useQuery(GET_EQUIPMENTS);
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

    return {
        data,
        loading,
        error,
        filters,
        setFilters,
        search,
        setSearch,
        options,
        filteredEquipments,
        refetch,
    };
}

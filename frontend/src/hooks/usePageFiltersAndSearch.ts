import { useMemo, useState } from "react";
import { getTypeHierarchy } from "../utils";
import type { Equipment } from "../types/equipment";

export function usePageFiltersAndSearch(equipments: Equipment[]) {
  const [filters, setFilters] = useState({
    domaine: "",
    type: "",
    categorie: "",
    sousCategorie: "",
  });
  const [search, setSearch] = useState("");

  const options = useMemo(() => {
    const domaines = new Set<string>();
    const types = new Set<string>();
    const categories = new Set<string>();
    const sousCategories = new Set<string>();
    equipments.forEach((eq: any) => {
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
  }, [equipments]);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((eq: any) => {
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
  }, [equipments, filters, search]);

  return {
    filters,
    setFilters,
    search,
    setSearch,
    options,
    filteredEquipments,
  };
}

export interface EquipmentFiltersProps {
  domaineOptions: string[];
  typeOptions: string[];
  categorieOptions: string[];
  sousCategorieOptions: string[];
  filters: {
    domaine: string;
    type: string;
    categorie: string;
    sousCategorie: string;
  };
  onChange: (filters: EquipmentFiltersProps["filters"]) => void;
}

function EquipmentFilters({
  domaineOptions,
  typeOptions,
  categorieOptions,
  sousCategorieOptions,
  filters,
  onChange,
}: EquipmentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        className="border rounded px-2 py-1"
        value={filters.domaine}
        onChange={e => onChange({ ...filters, domaine: e.target.value })}
      >
        <option value="">Domaine</option>
        {domaineOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1"
        value={filters.type}
        onChange={e => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">Type</option>
        {typeOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1"
        value={filters.categorie}
        onChange={e => onChange({ ...filters, categorie: e.target.value })}
      >
        <option value="">Catégorie</option>
        {categorieOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1"
        value={filters.sousCategorie}
        onChange={e => onChange({ ...filters, sousCategorie: e.target.value })}
      >
        <option value="">Sous-catégorie</option>
        {sousCategorieOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default EquipmentFilters;

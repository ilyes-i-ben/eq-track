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
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={filters.domaine}
        onChange={e => onChange({ ...filters, domaine: e.target.value })}
      >
        <option value="">Domaine</option>
        {domaineOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={filters.type}
        onChange={e => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">Type</option>
        {typeOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={filters.categorie}
        onChange={e => onChange({ ...filters, categorie: e.target.value })}
      >
        <option value="">Catégorie</option>
        {categorieOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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

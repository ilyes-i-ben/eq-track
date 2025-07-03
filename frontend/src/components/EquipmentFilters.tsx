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
  showArchived: boolean;
  onToggleShowArchived: (show: boolean) => void;
}

function EquipmentFilters({
  domaineOptions,
  typeOptions,
  categorieOptions,
  sousCategorieOptions,
  filters,
  onChange,
  showArchived,
  onToggleShowArchived,
}: EquipmentFiltersProps & { showArchived: boolean; onToggleShowArchived: (show: boolean) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center items-center">
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
      <label className="inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={showArchived}
          onChange={e => onToggleShowArchived(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">Afficher les éléments archivés</span>
      </label>
    </div>
  );
};

export default EquipmentFilters;

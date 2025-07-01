export interface EquipmentSearchProps {
    value: string;
    onChange: (value: string) => void;
}

const EquipmentSearch = ({ value, onChange }: EquipmentSearchProps) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="border rounded px-2 py-1 w-64"
                placeholder="Recherche par marque ou modèle..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default EquipmentSearch;

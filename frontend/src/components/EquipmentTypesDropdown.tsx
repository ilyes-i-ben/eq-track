import React, { type JSX } from "react";

export type EquipmentTypeOptions = {
    id: number;
    label: string;
    selectable: boolean;
    children: EquipmentTypeOptions[] | null;
}

interface EquipmentTypesDropdownProps {
    equipmentTypes: EquipmentTypeOptions[];
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const EquipmentTypesDropdown = ({
    equipmentTypes = [],
    value,
    onChange,
}: EquipmentTypesDropdownProps) => {
    return (
        <div>
            <label
                htmlFor="equipmentTypeId"
                className="block mb-1 text-sm font-medium text-gray-900"
            >
                Type
            </label>
            <select
                id="equipmentTypeId"
                name="equipmentTypeId"
                value={value}
                onChange={onChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            >
                <option value={0}>Sélectionner un type</option>
                {renderOptions(equipmentTypes)}
            </select>
        </div>
    );
};

const renderOptions = (
    options: EquipmentTypeOptions[] = [],
    depth: number = 0
): JSX.Element[] => {
    if (!Array.isArray(options)) return [];
    return options.flatMap((option) => {
        const indent = "\u00A0\u00A0".repeat(depth);
        const current = (
            <option
                key={option.id}
                value={option.id}
                disabled={!option.selectable}
            >
                {indent + option.label}
            </option>
        );

        const children = option.children
            ? renderOptions(option.children, depth + 1)
            : [];
        return [current, ...children];
    });
};

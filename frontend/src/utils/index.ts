import type { EquipmentType } from "../types";

const getTypeHierarchy = (equipmentType: EquipmentType | undefined | null) => {
    const names = [];
    let current = equipmentType;
    while (current) {
        names.unshift(current.name);
        current = current.parent;
    }
    while (names.length < 4) names.unshift("");
    return names;
};

export {getTypeHierarchy};
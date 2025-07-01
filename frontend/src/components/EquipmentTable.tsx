import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_EQUIPMENTS } from "../graphql/equipment";
import type { Equipment } from "../types/equipment";

const getTypeHierarchy = (equipmentType: any) => {
    const names = [];
    let current = equipmentType;
    while (current) {
        names.unshift(current.name);
        current = current.parent;
    }
    // Fill missing levels with empty string for table columns
    while (names.length < 4) names.unshift("");
    return names;
};

const EquipmentTable: React.FC = () => {
    console.log("hello ?")
    const { data, loading, error } = useQuery(ALL_EQUIPMENTS);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur lors du chargement des équipements.</div>;

    return (
        <div className="overflow-x-auto">
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
                    {data.equipments.map((eq: Equipment) => {
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

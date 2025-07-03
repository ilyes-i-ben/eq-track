import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Modal from "./Modal";
import EquipmentForm from "./EquipmentForm";
import type { CreateEquipmentInput, EquipmentType } from "../types";
import { CREATE_EQUIPMENT } from "../graphql/equipments/create";
import { GET_EQUIPMENTS } from "../graphql/equipments/find";
import { GET_EQUIPMENT_TYPES } from "../graphql/equipmentTypes/find";

interface AddEquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddEquipmentModal = ({ isOpen, onClose }: AddEquipmentModalProps) => {
    const { data, loading: loadingTypes } = useQuery(GET_EQUIPMENT_TYPES);
    const [createEquipment, { loading }] = useMutation(CREATE_EQUIPMENT, {
        refetchQueries: [{ query: GET_EQUIPMENTS }],
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (input: CreateEquipmentInput) => {
        setError(null);
        try {
            await createEquipment({ variables: { createEquipmentInput: input } });
            onClose();
        } catch (e: any) {
            setError(e.message || "Erreur lors de l'ajout.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un équipement">
            {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
            <EquipmentForm
                equipmentTypes={data?.equipmentTypes as EquipmentType[] || []}
                onSubmit={handleSubmit}
                onCancel={onClose}
                loading={loading || loadingTypes}
            />
        </Modal>
    );
};

export default AddEquipmentModal;

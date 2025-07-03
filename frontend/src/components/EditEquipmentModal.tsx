import { useState } from "react";
import Modal from "./Modal";
import EquipmentForm from "./EquipmentForm";
import type { Equipment, CreateEquipmentInput } from "../types/equipment";
import { useUpdateEquipment } from "../graphql/equipments/update";
import { useTypesDropdown } from "../graphql/equipmentTypes/dropdown";

interface EditEquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    equipment: Equipment | null;
}

const EditEquipmentModal = ({ isOpen, onClose, equipment }: EditEquipmentModalProps) => {
    const { data: equipmentTypeData, loading: loadingTypes } = useTypesDropdown();
    const [updateEquipment, { loading }] = useUpdateEquipment();
    const [error, setError] = useState<string | null>(null);

    if (!equipment) return null;

    const handleSubmit = async (input: CreateEquipmentInput) => {
        setError(null);
        try {
            await updateEquipment({
                variables: { input: { ...input, id: Number(equipment.id) } },
            });
            onClose();
        } catch (e: any) {
            setError(e.message || "erreur lors de la modification.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Modifier un équipement id: ${equipment.id}`}
        >
            {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
            <EquipmentForm
                equipmentTypes={equipmentTypeData?.equipmentTypeTree}
                onSubmit={handleSubmit}
                onCancel={onClose}
                loading={loading || loadingTypes}
                initialValues={{
                    name: equipment.name,
                    brand: equipment.brand,
                    model: equipment.model,
                    equipmentTypeId: Number(equipment?.equipmentType.id),
                }}
            />
        </Modal>
    );
};

export default EditEquipmentModal;

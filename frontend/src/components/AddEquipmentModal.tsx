import { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "./Modal";
import EquipmentForm from "./EquipmentForm";
import type { CreateEquipmentInput } from "../types";
import { CREATE_EQUIPMENT } from "../graphql/equipments/create";
import { GET_PAGINATED_EQUIPMENTS } from "../graphql/equipments/findPaginated";
import { useTypesDropdown } from "../graphql/equipmentTypes/dropdown";
import { usePaginationContext } from "../context/PaginationContext";

interface AddEquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddEquipmentModal = ({ isOpen, onClose }: AddEquipmentModalProps) => {
    const { data: equipmentTypeData, loading: loadingTypes } = useTypesDropdown();
    const { currentPage, pageSize } = usePaginationContext();
    const [createEquipment, { loading }] = useMutation(CREATE_EQUIPMENT, {
        refetchQueries: [
            {
                query: GET_PAGINATED_EQUIPMENTS,
                variables: { pageInput: currentPage, pageSizeInput: pageSize },
            },
        ],
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (input: CreateEquipmentInput) => {
        setError(null);
        try {
            await createEquipment({
                variables: { input }
            });
            onClose();
        } catch (e: any) {
            setError(e.message || "erreur lors l'ajout.");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un équipement">
            {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
            <EquipmentForm
                equipmentTypes={equipmentTypeData?.equipmentTypeTree}
                onSubmit={handleSubmit}
                onCancel={onClose}
                loading={loading || loadingTypes}
            />
        </Modal>
    );
};

export default AddEquipmentModal;

import {  useRemoveEquipment } from "../graphql/equipments/delete";
import type { Equipment, DeleteEquipmentResponse } from "../types/equipment";

async function confirmDelete(equipment: Equipment): Promise<boolean> {
  const Swal = (await import("sweetalert2")).default;
  const result = await Swal.fire({
    title: `Supprimer l'équipement?`,
    text: `Supprimer définitivement ${equipment.name} id: ${equipment.id} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });
  return !!result.isConfirmed;
}

export function useDeleteWithDialog() {
  const [removeEquipment] = useRemoveEquipment();

  const handleDelete = async (eq: Equipment) => {
    const confirmed = await confirmDelete(eq);
    if (!confirmed) return;
    const res = await removeEquipment({ variables: { id: Number(eq.id), soft: false } });
    const response = res?.data?.removeEquipment as DeleteEquipmentResponse | undefined;
    const Swal = (await import("sweetalert2")).default;
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Supprimé !",
        text: response.message || "équipement supprimé.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: response?.message || "La suppression a échoué.",
      });
    }
  };

  return { handleDelete };
}

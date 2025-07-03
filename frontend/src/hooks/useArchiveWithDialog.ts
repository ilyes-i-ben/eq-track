import { useRemoveEquipment } from "../graphql/equipments/delete";
import { confirmArchive } from "../utils/confirmArchive";
import type { Equipment, DeleteEquipmentResponse } from "../types/equipment";

export function useArchiveWithDialog() {
  const [archiveEquipment] = useRemoveEquipment();

  const handleArchive = async (eq: Equipment) => {
    const confirmed = await confirmArchive(eq);
    if (!confirmed) return;
    const res = await archiveEquipment({ variables: { id: Number(eq.id), soft: true } });
    const response = res?.data?.removeEquipment as DeleteEquipmentResponse | undefined;
    const Swal = (await import("sweetalert2")).default;
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Archivé !",
        text: response.message || "équipement archivé.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: response?.message || "L'archivage a échoué.",
      });
    }
  };

  return { handleArchive };
}

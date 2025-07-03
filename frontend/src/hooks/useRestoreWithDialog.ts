import { useUpdateEquipment } from "../graphql/equipments/update";
import { confirmRestore } from "../utils/confirmRestore";
import type { Equipment } from "../types/equipment";

export function useRestoreWithDialog() {
  const [updateEquipment] = useUpdateEquipment();

  const handleRestore = async (eq: Equipment) => {
    const confirmed = await confirmRestore(eq);
    if (!confirmed) return;
    const res = await updateEquipment({ variables: { input: { id: Number(eq.id), isDeleted: false } } });
    const Swal = (await import("sweetalert2")).default;
    const response = res?.data?.updateEquipment;
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Restauré !",
        text: `${response.name} a été restauré.`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "La restauration a échoué.",
      });
    }
  };

  return { handleRestore };
}

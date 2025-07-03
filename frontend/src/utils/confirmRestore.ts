import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export async function confirmRestore(equipment: any): Promise<boolean> {
  const result = await Swal.fire({
    title: `Restaurer l'équipement ?`,
    text: `Voulez-vous restaurer ${equipment.name} id: ${equipment.id} ?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Oui, restaurer',
    cancelButtonText: 'Annuler',
  });
  return !!result.isConfirmed;
}

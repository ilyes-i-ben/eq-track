import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export async function confirmArchive(equipment: any): Promise<boolean> {
  const result = await Swal.fire({
    title: `Archiver l'équipement ?`,
    text: `Voulez-vous archiver ${equipment.name} id: ${equipment.id} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#fbbf24',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Oui, archiver',
    cancelButtonText: 'Annuler',
  });
  return !!result.isConfirmed;
}

import { gql, useMutation } from "@apollo/client";
import { usePaginationContext } from "../../context/PaginationContext";
import { GET_PAGINATED_EQUIPMENTS } from "./findPaginated";

export const UPDATE_EQUIPMENT = gql`
  mutation UpdateEquipment($input: UpdateEquipmentInput!) {
    updateEquipment(updateEquipmentInput: $input) {
      id
      name
      brand
      model
      equipmentType {
        id
        name
      }
    }
  }
`;

export const useUpdateEquipment = () => {
  const { currentPage, pageSize } = usePaginationContext();
  return useMutation(UPDATE_EQUIPMENT, {
    refetchQueries: [
      {
        query: GET_PAGINATED_EQUIPMENTS,
        variables: { pageInput: currentPage, pageSizeInput: pageSize },
      },
    ],
  });
};
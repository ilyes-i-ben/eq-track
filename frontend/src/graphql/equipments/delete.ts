import { gql, useMutation } from "@apollo/client";
import { usePaginationContext } from "../../context/PaginationContext";
import { GET_PAGINATED_EQUIPMENTS } from "./findPaginated";

export const REMOVE_EQUIPMENT = gql`
  mutation RemoveEquipment($id: Int!, $soft: Boolean!) {
    removeEquipment(id: $id, soft: $soft) {
      success
      message
    }
  }
`;

export const useRemoveEquipment = () => {
  const { currentPage, pageSize } = usePaginationContext();
  return useMutation(REMOVE_EQUIPMENT, {
    refetchQueries: [
      {
        query: GET_PAGINATED_EQUIPMENTS,
        variables: { pageInput: currentPage, pageSizeInput: pageSize },
      },
    ],
  });
};
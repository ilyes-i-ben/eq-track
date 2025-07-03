import { gql, useMutation } from "@apollo/client";
import { GET_EQUIPMENTS } from "./find";

export const REMOVE_EQUIPMENT = gql`
  mutation RemoveEquipment($id: Int!, $soft: Boolean!) {
    removeEquipment(id: $id, soft: $soft) {
      success
      message
    }
  }
`;

export const useRemoveEquipment = () => useMutation(REMOVE_EQUIPMENT, {
  refetchQueries: [GET_EQUIPMENTS]
})
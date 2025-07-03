import { gql, useMutation } from "@apollo/client";
import { GET_EQUIPMENTS } from "./find";

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

export const useUpdateEquipment = () => useMutation(UPDATE_EQUIPMENT, {
    refetchQueries: [{ query: GET_EQUIPMENTS }],
});
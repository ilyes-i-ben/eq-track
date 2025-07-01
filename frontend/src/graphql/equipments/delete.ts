import { gql } from "@apollo/client";

export const REMOVE_EQUIPMENT = gql`
  mutation RemoveEquipment($id: Int!, $soft: Boolean!) {
    removeEquipment(id: $id, soft: $soft) {
      success
      message
    }
  }
`;
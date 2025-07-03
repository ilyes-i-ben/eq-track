import { gql } from "@apollo/client";

export const UPDATE_EQUIPMENT = gql`
  mutation UpdateEquipment($id: Int!, $input: CreateEquipmentInput!) {
    updateEquipment(id: $id, input: $input) {
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

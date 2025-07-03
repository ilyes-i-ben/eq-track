import { gql } from "@apollo/client";

export const GET_EQUIPMENTS = gql`
query allEquipments {
  equipments {
    id
    name
    brand
    model
    equipmentType {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
          }
        }
      }
    }
    createdAt
    updatedAt
  }
}
`;
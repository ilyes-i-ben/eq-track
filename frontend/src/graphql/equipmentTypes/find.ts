import { gql } from "@apollo/client";

export const GET_EQUIPMENT_TYPES = gql`
query {
  equipmentTypes {
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
`;
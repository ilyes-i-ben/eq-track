import { gql, useQuery } from "@apollo/client";

export const GET_EQUIPMENT_TREE = gql`
query {
  equipmentTypeTree {
    id
    label
    children {
      id
      label
      children {
        id
        label
        selectable
        children {
          id
          label
          selectable
        }
      }
    }
  }
}
`;

export const useTypesDropdown = () => useQuery(GET_EQUIPMENT_TREE);
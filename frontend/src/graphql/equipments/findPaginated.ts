import { gql, useQuery } from "@apollo/client";

export const GET_PAGINATED_EQUIPMENTS = gql`
  query findPaginatedEquipments($pageInput: Int!, $pageSizeInput: Int!) {
    findPaginatedEquipments(page: $pageInput, pageSize: $pageSizeInput) {
      items {
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
        isDeleted
        createdAt
        updatedAt
      }
      totalCount
      totalPages
      currentPage
      pageSize
    }
  }
`;

export const usePaginatedEquipments = (page: number, pageSize: number) =>
  useQuery(GET_PAGINATED_EQUIPMENTS, {
    variables: { pageInput: page, pageSizeInput: pageSize },
    fetchPolicy: "cache-and-network",
  });
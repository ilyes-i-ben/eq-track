import { gql } from "@apollo/client";

export const CREATE_EQUIPMENT = gql`
    mutation CreateEquipment($input: CreateEquipmentInput!) {
        createEquipment(createEquipmentInput: $input) {
            id
            name
            brand
            model
            equipmentTypeId
            createdAt
            updatedAt
            equipmentType {
                id
                name
            }
        }
    }
`
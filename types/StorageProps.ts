export interface StorageProps {
    id: string;
    name: string;
    address: AddressProps;
    createdAt: Date;
    updatedAt: Date;
}

interface AddressProps {
    id: string;
    street: string;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}
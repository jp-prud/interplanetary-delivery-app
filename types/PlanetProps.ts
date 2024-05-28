import { StorageProps } from "./Storage";

export interface PlanetProps {
    id: string;
    name: string;
    storages?: StorageProps[];
    createdAt: Date;
    updatedAt: Date;
}

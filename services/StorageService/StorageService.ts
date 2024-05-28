import { StorageProps } from '@types';

export function StorageService() {
  async function getStorageById(storageId: string) {}

  async function listStorages() {}

  async function createStorages(storage: StorageProps) {}

  async function deleteStorageById(storageId: string) {}

  return {
    getStorageById,
    listStorages,
    createStorages,
    deleteStorageById,
  };
}

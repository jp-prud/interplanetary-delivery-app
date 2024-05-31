import {
  BaseLocation,
  ListLocation,
  Location,
  UpdateLocationDTO,
} from '@types';

import { HttpClient } from '../utils/HttpClient';

export function LocationService() {
  async function getLocationById<T extends BaseLocation>(
    locationId: Location<T>['id'],
  ) {
    const response = await HttpClient.get<Location<T>>(
      `/locations/${locationId}`,
    );

    return response.data;
  }

  async function listLocations() {
    const response = await HttpClient.get<ListLocation[]>('/locations');

    return response.data;
  }

  async function createLocation<T extends BaseLocation>(location: Location<T>) {
    const response = await HttpClient.post<Location<T>>('/locations', location);

    return response.data;
  }

  async function updateLocationById<T extends BaseLocation>(
    locationId: BaseLocation['id'],
    updateLocation: UpdateLocationDTO<T>,
  ) {
    await HttpClient.put(`/locations/${locationId}`, updateLocation);

    return updateLocation;
  }

  async function deleteLocationById(locationId: BaseLocation['id']) {
    await HttpClient.delete(`/locations/${locationId}`);
  }

  return {
    getLocationById,
    createLocation,
    updateLocationById,
    listLocations,
    deleteLocationById,
  };
}

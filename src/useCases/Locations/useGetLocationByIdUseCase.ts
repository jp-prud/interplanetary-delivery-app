import { LocationService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { BaseLocation, QueryKeys } from '@types';

export function useGetLocationByIdUseCase(locationId: BaseLocation['id']) {
  const { getLocationById } = LocationService();

  const {
    data: locationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKeys.getLocationByid, locationId],
    queryFn: () => getLocationById(locationId),
  });

  return {
    locationData,
    isLoading,
    error,
  };
}

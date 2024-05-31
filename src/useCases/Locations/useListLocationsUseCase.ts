import { LocationService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@types';

export function useListLocationsUseCase() {
  const { listLocations } = LocationService();

  const {
    data: listLocationsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.getLocations],
    queryFn: listLocations,
  });

  return {
    listLocationsData,
    listLocationsRefetch: refetch,
    isLoading,
    error,
  };
}

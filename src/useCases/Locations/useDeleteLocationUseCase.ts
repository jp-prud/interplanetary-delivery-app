import { LocationService } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseLocation, MutationKeys, MutationOptions, QueryKeys } from '@types';

export function useDeleteLocationUseCase(options?: MutationOptions<void>) {
  const { deleteLocationById } = LocationService();

  const queryCliente = useQueryClient();

  const { mutate, isPending, isError } = useMutation<
    void,
    unknown,
    BaseLocation['id']
  >({
    mutationKey: [MutationKeys.deleteLocationById],
    mutationFn: locationId => deleteLocationById(locationId),
    onSuccess: () => {
      queryCliente.invalidateQueries({
        queryKey: [QueryKeys.getLocations],
      });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(
          options.errorMessage ||
            'Failed to delete location. Please try again.',
        );
      }
    },
  });

  return {
    deleteLocation: mutate,
    isPending,
    isError,
  };
}

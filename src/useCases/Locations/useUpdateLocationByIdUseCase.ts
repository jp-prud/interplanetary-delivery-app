import { LocationService } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BaseLocation,
  Location,
  MutationKeys,
  MutationOptions,
  QueryKeys,
  UpdateLocationDTO,
} from '@types';

export function useUpdateLocationByIdUseCase<T extends BaseLocation>(
  options?: MutationOptions<UpdateLocationDTO<T>>,
) {
  const { updateLocationById } = LocationService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<
    UpdateLocationDTO<T>,
    unknown,
    {
      locationId: BaseLocation['id'];
      updateLocation: Location<T>;
    }
  >({
    mutationKey: [MutationKeys.editLocationById],
    mutationFn: ({ locationId, updateLocation }) =>
      updateLocationById<T>(locationId, updateLocation),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.getLocations],
      });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(
          options.errorMessage || 'Failed to edit location. Please try again.',
        );
      }
    },
  });

  return {
    editLocation: mutateAsync,
    isPending,
    isError,
  };
}

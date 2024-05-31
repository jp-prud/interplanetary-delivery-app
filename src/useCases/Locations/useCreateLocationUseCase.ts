import { LocationService } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BaseLocation,
  CreateLocationDTO,
  Location,
  MutationKeys,
  MutationOptions,
  QueryKeys,
} from '@types';

export function useCreateLocationUseCase<T extends BaseLocation>(
  options?: MutationOptions<Location<T>>,
) {
  const { createLocation } = LocationService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<
    Location<T>,
    unknown,
    CreateLocationDTO<T>
  >({
    mutationKey: [MutationKeys.createLocation],
    mutationFn: location =>
      createLocation<T>({
        id: Math.random().toString(36).substr(2, 9),
        ...location,
      }),
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
          options.errorMessage ||
            'An error occurred when creating the location',
        );
      }
    },
  });

  return {
    createLocation: mutateAsync,
    isPending,
  };
}

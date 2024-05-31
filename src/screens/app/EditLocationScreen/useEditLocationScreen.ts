import { useToastService } from '@context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { BaseLocation, EarthLocationType, MarsLocationType } from '@types';
import {
  useGetLocationByIdUseCase,
  useUpdateLocationByIdUseCase,
} from '@useCases';
import { useForm } from 'react-hook-form';

import { CreateLocationFormSchema } from '../CreateLocationScreen/createLocationFormSchema';

export function useEditLocationScreen(locationId: BaseLocation['id']) {
  const { locationData, isLoading } = useGetLocationByIdUseCase(locationId);

  const { navigate } = useNavigation();

  const { showToast } = useToastService();

  const { editLocation, isPending } = useUpdateLocationByIdUseCase({
    onSuccess: () => {
      navigate('HomeScreen');

      showToast({
        message: 'Location updated successfully',
        type: 'success',
        position: 'bottom',
      });
    },
    onError: () => {
      showToast({
        message: 'Error updating location. Please try again.',
        type: 'info',
        position: 'bottom',
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isLoading: isSubmitting, isValid: isFormValid },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...locationData },
    resolver: zodResolver(CreateLocationFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    const updateLocation: BaseLocation = { id: locationId, ...data };

    editLocation({
      locationId,
      updateLocation,
    });
  });

  return {
    locationData:
      locationData?.planet === 'earth'
        ? (locationData as EarthLocationType)
        : (locationData as MarsLocationType),
    isLoading,
    control,
    onSubmit,
    isSubmitting: isPending || isSubmitting,
    isFormValid,
  };
}

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useCreateLocationUseCase } from '@useCases';
import { useForm } from 'react-hook-form';

import {
  CREATE_EARTH_LOCATION_DEFAULT_VALUES,
  CREATE_MARS_LOCATION_DEFAULT_VALUES,
  CreateLocationFormSchema,
} from './createLocationFormSchema';

export function useCreateLocationScreen() {
  const { createLocation } = useCreateLocationUseCase({
    onError: () => {},
    onSuccess: () => {},
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { isLoading: isFormLoading, isSubmitting, isValid: isFormValid },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...CREATE_EARTH_LOCATION_DEFAULT_VALUES },
    resolver: zodResolver(CreateLocationFormSchema),
  });

  const { navigate } = useNavigation();

  const onSubmit = handleSubmit(async data => {
    await createLocation(data);

    reset();

    navigate('HomeScreen');
  });

  const selectedPlanet = watch('planet');

  function handleSelectPlanet(planet: 'earth' | 'mars') {
    setValue('planet', planet);
  }

  useEffect(() => {
    clearErrors();

    if (selectedPlanet === 'mars') {
      setValue('lotNumber', CREATE_MARS_LOCATION_DEFAULT_VALUES.lotNumber!);
    }
  }, [selectedPlanet, setValue, clearErrors]);

  return {
    control,
    onSubmit,
    isFormLoading: isFormLoading || isSubmitting,
    isFormValid,
    selectedPlanet,
    handleSelectPlanet,
  };
}

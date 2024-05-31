import { useState } from 'react';

import { BaseLocation } from '@types';
import { useListLocationsUseCase } from '@useCases';

export function useHomeScreen() {
  const { listLocationsData, isLoading, listLocationsRefetch } =
    useListLocationsUseCase();

  const [selectedLocationId, setSelectedLocationId] = useState<
    BaseLocation['id'] | null
  >(null);

  function onSelectLocation(locationId: BaseLocation['id']) {
    setSelectedLocationId(locationId);
  }

  function onClearSelectedLocation() {
    setSelectedLocationId(null);
  }

  return {
    listLocationsData,
    isLoading,
    selectedLocationId,
    onSelectLocation,
    onClearSelectedLocation,
    listLocationsRefetch,
  };
}

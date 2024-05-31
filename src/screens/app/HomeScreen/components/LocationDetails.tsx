import { useToastService } from '@context';
import { useNavigation } from '@react-navigation/native';
import { useDeleteLocationUseCase, useGetLocationByIdUseCase } from '@useCases';

import {
  ActivityIndicator,
  Box,
  Icon,
  PlanetLabel,
  RenderIfElse,
  Text,
  TitleBar,
} from '@components';

interface LocationDetailsProps {
  locationId: string;
  onHandleClose: () => void;
}

export function LocationDetails({
  locationId,
  onHandleClose,
}: LocationDetailsProps) {
  const { locationData, isLoading, error } =
    useGetLocationByIdUseCase(locationId);

  const { showToast } = useToastService();

  const { deleteLocation, isPending } = useDeleteLocationUseCase({
    onError: () => {
      showToast({
        message: 'Error deleting location. Please try again.',
        type: 'info',
        duration: 2000,
        position: 'bottom',
      });
    },
    onSuccess: () => {
      onHandleClose();

      showToast({
        message: 'Location deleted successfully',
        type: 'success',
        position: 'bottom',
        duration: 2000,
      });
    },
  });

  const { navigate } = useNavigation();

  function renderEarthAddress() {
    return (
      <Box mt="s32">
        <TitleBar title="Address informations" />

        {locationData.planet === 'earth' && locationData.address && (
          <Box>
            <Text>Street: {locationData.address.street}</Text>
            <Text>Ciy: {locationData.address.city}</Text>
            <Text>Country: {locationData.address.country}</Text>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box px="s24" py="s16">
      {isLoading && <ActivityIndicator />}
      {!isLoading && error && <Text>Error: {error.message}</Text>}
      {!isLoading && !error && locationData && (
        <>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            testID="location-details-screen">
            <Text preset="headingMedium" bold>
              {locationData.name}
            </Text>

            <Box flexDirection="row" alignItems="center" gap="s16">
              <PlanetLabel planetLabel={locationData.planet} />
              <Icon
                name="pencil"
                onPress={() =>
                  navigate('EditLocationScreen', {
                    locationId,
                  })
                }
              />

              <RenderIfElse
                condition={isPending}
                renderIf={<ActivityIndicator />}
                renderElse={
                  <Icon
                    name="trash"
                    onPress={() => deleteLocation(locationData.id)}
                  />
                }
              />

              <Icon
                name="close"
                onPress={onHandleClose}
                testID="delete-location-button"
              />
            </Box>
          </Box>
        </>
      )}

      {locationData?.planet === 'earth' && renderEarthAddress()}
    </Box>
  );
}

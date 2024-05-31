import { ListLocation } from '@types';

import { Box, TouchableOpacityBox } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { PlanetLabel } from '../PlanetLabel/PlanetLabel';
import { Text } from '../Text/Text';

interface StorageLocationItemProps {
  location: ListLocation;
  onHandlePressDetailsLocation: (locationId: ListLocation['id']) => void;
}

export function StorageLocationItem({
  location,
  onHandlePressDetailsLocation,
}: StorageLocationItemProps) {
  const { id, name, planet } = location;

  function renderStorageInfoByPlanet() {
    if (planet === 'earth') {
      const {
        address: { street, city, country },
      } = location;

      return (
        <Text preset="paragraphSmall" color="neutral600">
          {street} • {city} • {country}
        </Text>
      );
    }

    return (
      <Text preset="paragraphSmall" color="neutral600">
        Location ID: #{location!.lotNumber}
      </Text>
    );
  }

  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      gap="s16"
      p="s16"
      borderRadius="s16"
      borderColor="neutral200"
      borderWidth={2}
      onPress={() => onHandlePressDetailsLocation(id)}
      testID="storage-location-item">
      <Box
        width={46}
        height={46}
        borderRadius="s32"
        backgroundColor="neutral100"
        alignItems="center"
        justifyContent="center">
        <Icon name="archiveBox" color="neutral600" />
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex={1}
        gap="s8">
        <Box flex={1}>
          <Text preset="paragraphMedium" semiBold>
            {name}
          </Text>

          {renderStorageInfoByPlanet()}
        </Box>

        <PlanetLabel planetLabel={planet} />
      </Box>
    </TouchableOpacityBox>
  );
}

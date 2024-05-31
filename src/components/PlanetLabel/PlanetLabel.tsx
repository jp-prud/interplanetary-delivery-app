import { Box, Text } from '@components';

import { planetLabelPresets } from './planetLabelPresets';

interface PlanetLabelProps {
  planetLabel: 'earth' | 'mars';
}

export function PlanetLabel({ planetLabel = 'earth' }: PlanetLabelProps) {
  const { container, content, label, icon } = planetLabelPresets[planetLabel];

  return (
    <Box
      backgroundColor={container}
      px="s12"
      py="s4"
      borderRadius="s16"
      flexDirection="row"
      gap="s8">
      <Text>{icon}</Text>
      <Text color={content}>{label}</Text>
    </Box>
  );
}

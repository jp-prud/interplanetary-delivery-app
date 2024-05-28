import { Box, Icon, Screen } from '@components';
import { AppScreenProps } from '@routes';

export function ProfileScreen({}: AppScreenProps<'ProfileScreen'>) {
  return (
    <Screen canGoBack>
      <Box>
        <Box
          alignSelf="center"
          height={180}
          width={180}
          borderWidth={10}
          borderStyle="dashed"
          borderColor="neutral300"
          backgroundColor="neutral100"
          justifyContent="center"
          alignItems="center"
          style={{ borderRadius: 90 }}>
          <Icon name="archiveBox" />
          <Box
            width={38}
            height={38}
            borderWidth={1}
            borderColor="neutral300"
            backgroundColor="green100"
            position="absolute"
            right={0}
            top="65%"
            borderRadius="s32"
          />
        </Box>
      </Box>
    </Screen>
  );
}

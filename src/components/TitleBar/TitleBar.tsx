import { Box, BoxProps, LinkStandAlone, Text, TextVariants } from '@components';

export interface TitleBarProps {
  title: string;
  linkText?: string;
  hasIcon?: boolean;
  preset?: TextVariants;
  onPress?: () => void;
}

export function TitleBar({
  title,
  linkText,
  onPress,
  hasIcon = false,
  preset = 'paragraphLarge',
  ...boxProps
}: TitleBarProps & BoxProps) {
  return (
    <Box
      testID="title-bar"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...boxProps}>
      <Text preset={preset} bold>
        {title}
      </Text>

      {linkText && (
        <LinkStandAlone onPress={onPress} text={linkText} hasIcon={hasIcon} />
      )}
    </Box>
  );
}

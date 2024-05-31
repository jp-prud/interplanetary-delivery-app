import { Pressable } from 'react-native';

import { IconName } from '@components';
import { useAppTheme } from '@hooks';
import { ThemeColors } from '@theme';

import {
  ArchiveBoxFillIcon,
  ArchiveBoxIcon,
  BellIcon,
  CalendarIcon,
  CheckmarkAlertShield,
  CheckmarkIcon,
  ChevronIcon,
  CloseIcon,
  GearshapeIcon,
  HouseFillIcon,
  HouseIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TagIcon,
  TrashIcon,
} from '../../assets/icons';
import { Box } from '../Box/Box';

export interface IconBase {
  size?: number;
  color?: string;
  testID?: string;
}

export interface IconProps {
  name: IconName;
  color?: ThemeColors;
  size?: number;
  onPress?(): void;
  testID?: string;
}

export function Icon({
  name,
  color = 'backgroundContrast',
  size,
  onPress,
  testID,
}: IconProps) {
  const { colors } = useAppTheme();
  const SVGIcon = iconRegistry[name];

  const Icon = (
    <SVGIcon color={colors[color]} size={size} testID={testID || 'Icon'} />
  );

  if (onPress) {
    return (
      <Pressable
        hitSlop={10}
        onPress={onPress}
        style={{}}
        testID={testID || 'Icon'}>
        {Icon}
      </Pressable>
    );
  }

  return <Box>{Icon}</Box>;
}

const iconRegistry = {
  chevron: ChevronIcon,
  close: CloseIcon,
  calendar: CalendarIcon,
  plus: PlusIcon,
  bell: BellIcon,
  gearshape: GearshapeIcon,
  house: HouseIcon,
  houseFill: HouseFillIcon,
  archiveBoxFill: ArchiveBoxFillIcon,
  archiveBox: ArchiveBoxIcon,
  search: SearchIcon,
  checkmark: CheckmarkIcon,
  trash: TrashIcon,
  pencil: PencilIcon,
  tag: TagIcon,
  checkmarkAlert: CheckmarkAlertShield,
};

type IconType = typeof iconRegistry;

export type IconName = keyof IconType;

import { ListRenderItemInfo } from 'react-native';

import { TaskProps } from '@types';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Box, Task, Text } from '@components';

// import { useHomeScreen } from '../useHomeScreen';

import { RubberBandingList } from './RubberBandingList';

interface SliderTaskListProps {
  searchTerm: string;
  data: TaskProps[];
  onPressItem?: (id: string) => void;
}

export function SliderTaskList({
  searchTerm,
  data,
  onPressItem,
}: SliderTaskListProps) {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  function renderItemSeparator() {
    return <Box height={20} />;
  }

  function renderTask({ item: task }: ListRenderItemInfo<TaskProps>) {
    return (
      <Task
        task={task}
        searchTerm={searchTerm}
        onPress={() => onPressItem && onPressItem(task.id)}
      />
    );
  }

  function renderEmptyList() {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Text mb="s16" textAlign="center" preset="paragraphLarge" semiBold>
          No task for today
        </Text>
        <Text color="neutral500">There is no task for today. Create one ?</Text>
      </Box>
    );
  }

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {[1, 2, 3].map((_item, index) => (
        <RubberBandingList
          key={index}
          data={data}
          renderItem={renderTask}
          ItemSeparatorComponent={renderItemSeparator}
          ListEmptyComponent={renderEmptyList}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
}

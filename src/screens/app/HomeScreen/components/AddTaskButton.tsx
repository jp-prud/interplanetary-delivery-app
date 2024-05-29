import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Box, Icon, Text, TouchableOpacityBox } from '@components';
import { useBottomSheet } from '@hooks';

import { CreateTaskForm } from './CreateTaskForm';

type Status = 'closed' | 'open';
type Options = 'createTask' | 'createCategory';

type AddTaskStatus = {
  status: Status;
  selectedOption?: Options;
};

export function AddTaskButton() {
  const { width } = useWindowDimensions();
  const [addTaskStatus, setAddTaskStatus] = useState<AddTaskStatus>({
    status: 'closed',
    selectedOption: 'createTask',
  });
  const { bottomSheetRef, renderBackdrop, BOTTOM_SHEET_STYLES } =
    useBottomSheet();

  const currentSharedStatus = useDerivedValue<AddTaskStatus>(
    () => ({
      status: 'closed',
      options: 'createTask',
    }),
    [addTaskStatus],
  );

  const defaultBoxSize = useSharedValue({
    width: 46,
  });

  const openContainerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      defaultBoxSize.value.width,
      [46, width - 32, width],
      [46, 260, 440],
    );

    const borderRadius = interpolate(
      defaultBoxSize.value.width,
      [46, width - 32, width],
      [30, 32, 16],
      'clamp',
    );

    const position = interpolate(
      defaultBoxSize.value.width,
      [46, width - 32, width],
      [16, 16, 0],
    );

    return {
      height: withTiming(height, {
        duration: 200,
      }),
      borderRadius: withTiming(borderRadius, {
        duration: 200,
      }),
      width: withTiming(defaultBoxSize.value.width, {
        duration: 200,
      }),
      bottom: withTiming(position, {
        duration: 200,
      }),
      right: withTiming(position, {
        duration: 200,
      }),
    };
  });

  const openButtonRenderStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(currentSharedStatus.value.status === 'open' ? 0 : 24),
      opacity: withTiming(currentSharedStatus.value.status === 'open' ? 0 : 1),
    };
  });

  function onOpen() {
    'worklet';

    setAddTaskStatus({
      status: 'open',
    });
    defaultBoxSize.value = {
      width: width - 32,
    };
  }

  function onClose() {
    'worklet';

    setAddTaskStatus({
      status: 'closed',
    });

    defaultBoxSize.value = {
      width: 46,
    };
  }

  function onPressCreateTask() {
    bottomSheetRef.current?.expand();

    onClose();
  }

  function renderOptions() {
    return (
      <Animated.View>
        <TouchableOpacityBox
          style={styles.item}
          borderRadius="s8"
          p="s8"
          onPress={() => onPressCreateTask()}
          flexDirection="row"
          gap="s16"
          width="100%">
          <Box
            width={42}
            height={42}
            borderRadius="s32"
            backgroundColor="blue"
            justifyContent="center"
            alignItems="center">
            <Icon name="plus" color="white" />
          </Box>
          <Box flex={1}>
            <Text preset="paragraphLarge" semiBold color="black700">
              Create task
            </Text>
            <Text preset="paragraphSmall" color="black500">
              Create a new task to organize your day more efficiently.
            </Text>
          </Box>
        </TouchableOpacityBox>

        <TouchableOpacityBox
          style={styles.item}
          borderRadius="s8"
          p="s8"
          flexDirection="row"
          gap="s16"
          width="100%">
          <Box
            width={42}
            height={42}
            borderRadius="s32"
            backgroundColor="green500"
            justifyContent="center"
            alignItems="center">
            <Icon name="plus" color="white" />
          </Box>
          <Box flex={1}>
            <Text preset="paragraphLarge" semiBold color="black700">
              Create category
            </Text>
            <Text preset="paragraphSmall" color="black500">
              Create a category to group your tasks and keep them organized.
            </Text>
          </Box>
        </TouchableOpacityBox>
      </Animated.View>
    );
  }

  return (
    <>
      <Animated.View style={[styles.container, openContainerStyle]}>
        {addTaskStatus.status !== 'closed' && (
          <Animated.View style={[styles.list]}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb="s8">
              <Text semiBold preset="paragraphLarge">
                {addTaskStatus.status === 'open' ? 'Options' : 'Create Task'}
              </Text>

              <Icon name="close" onPress={onClose} color="black400" />
            </Box>

            {addTaskStatus.status === 'open' && renderOptions()}
          </Animated.View>
        )}

        {addTaskStatus.status === 'closed' && (
          <Animated.View style={openButtonRenderStyle}>
            <Icon name="plus" color="black1000" onPress={onOpen} />
          </Animated.View>
        )}
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={['54%']}
        animationConfigs={{
          duration: 400,
        }}
        backdropComponent={renderBackdrop}
        containerStyle={BOTTOM_SHEET_STYLES.container}
        index={-1}>
        <BottomSheetView>
          <CreateTaskForm onClose={onClose} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    zIndex: 2,
    overflow: 'hidden',
    elevation: 5,
    right: 16,
    bottom: 16,
    minHeight: 46,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  list: {
    width: '100%',
    flex: 1,
    height: '100%',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#fafafa',
  },
  containerModal: {
    zIndex: 999999,
  },
  contentContainer: {
    zIndex: 9,
  },
});

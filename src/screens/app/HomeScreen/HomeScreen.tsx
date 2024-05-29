import React from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { Box, FormTextInput, Icon, Screen, Text, TitleBar } from '@components';
import { useBottomSheet } from '@hooks';
import { AppScreenProps } from '@routes';

import { AddTaskButton, SliderTaskList, TaskDetails } from './components';
import { useHomeScreen } from './useHomeScreen';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const {
    filteredTasks,
    control,
    isLoading,
    searchTerm,
    onDetailsTask,
    bottomSheetRef,
    selectedTask,
    selectedTaskLoading,
    deleteTaskById,
  } = useHomeScreen();

  const { renderBackdrop, BOTTOM_SHEET_STYLES } = useBottomSheet();

  return (
    <Screen isLoading={isLoading}>
      <AddTaskButton />
      <Box
        height={32}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="s32">
        <Icon
          name="house"
          onPress={() => navigation.navigate('ProfileScreen')}
        />

        <Icon
          name="gearshape"
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </Box>

      <FormTextInput
        control={control}
        name="searchTerm"
        placeholder="Search for a task"
        RightComponent={<Icon name="search" />}
      />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <TitleBar title="Your tasks" mb="s32" mt="s32" />

        <Box
          width={28}
          height={28}
          backgroundColor="neutral200"
          borderRadius="s16"
          justifyContent="center"
          alignItems="center">
          <Text semiBold>{filteredTasks.length}</Text>
        </Box>
      </Box>

      <SliderTaskList
        data={filteredTasks}
        searchTerm={searchTerm}
        onPressItem={onDetailsTask}
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={['50%', '75%']}
        backdropComponent={renderBackdrop}
        animationConfigs={{
          duration: 400,
        }}
        containerStyle={BOTTOM_SHEET_STYLES.container}
        index={-1}>
        <BottomSheetView>
          <TaskDetails
            task={selectedTask!}
            isLoading={selectedTaskLoading}
            onDeleteTask={deleteTaskById}
          />
        </BottomSheetView>
      </BottomSheet>
    </Screen>
  );
}

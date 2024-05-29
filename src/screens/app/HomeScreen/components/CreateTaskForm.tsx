import React from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import {
  Box,
  Button,
  FormTextInput,
  Icon,
  Text,
  TouchableOpacityBox
} from '@components';
import { useBottomSheet as ExternalLibModal } from '@gorhom/bottom-sheet';
import { useAppTheme, useBottomSheet } from '@hooks';
import { useCreateTaskForm } from '../useCreateTaskForm';

interface CreateTaskFormProps {
  onClose: () => void;
}

export function CreateTaskForm({ onClose }: CreateTaskFormProps) {
  const { onSubmit, createTaskLoading, createTaskControl, isValidCreateTaskForm } = useCreateTaskForm();
 
  const {
    bottomSheetRef: selectCategoryModalRef,
    renderBackdrop,
    onOpen: onOpenSelectCategoryModal,
  } = useBottomSheet();

  const { close } = ExternalLibModal()

  const {
    bottomSheetRef: selectPriorityModalRef,
    onOpen: onOpenSelectPriorityModal,
  } = useBottomSheet();

  const { colors } = useAppTheme();

  async function onHandleSubmitPress(data: any) {
    await onSubmit(data);

    onClose();
  }

  function handlePressSelectCategory() {
    onOpenSelectCategoryModal();
  }

  function handlePressSelectPriority() {
    onOpenSelectPriorityModal();
  }

  function handlePressCloseForm() {
    close()
  }

  return (
    <>
      <Box p="s16">
        <Box flexDirection='row' justifyContent='space-between' alignItems='center' mb="s24">
          <Text preset="headingMedium" >
            Creating task
          </Text>

          <Icon name="close" color="black400" onPress={handlePressCloseForm} /> 
        </Box>

        <Box gap="s16">
          <FormTextInput
            placeholder="Study plan"
            name="title"
            control={createTaskControl}
            description="What is the task about?"
          />

          <FormTextInput
            placeholder="Make a weekly study plan to learn a new language"
            name="description"
            control={createTaskControl}
            numberOfLines={2}
            multiline
            textAlignVertical="top"
            enterKeyHint="enter"
          />
        </Box>

        <Box gap="s12" py="s24">
          <Box flexDirection="row" justifyContent="space-between">
            <Text color="neutral600" semiBold>
              Categories
            </Text>
            <TouchableOpacityBox onPress={handlePressSelectCategory}>
              <Text semiBold>Trabalho</Text>
            </TouchableOpacityBox>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Text color="neutral600" semiBold>
              Priority
            </Text>
            <TouchableOpacityBox onPress={handlePressSelectPriority}>
              <Text semiBold color="red500">
                Urgente
              </Text>
            </TouchableOpacityBox>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Text color="neutral600" semiBold>
              Tags
            </Text>
            <Text semiBold color="red500">
              Urgente
            </Text>
          </Box>
        </Box>

        <Button
          text="Criar"
          loading={createTaskLoading}
          onPress={onHandleSubmitPress}
          disabled={!isValidCreateTaskForm}
        />
      </Box>

      <BottomSheet
        ref={selectCategoryModalRef}
        enablePanDownToClose
        snapPoints={['40%']}
        backgroundStyle={{ backgroundColor: colors.addButtonTaskBackground }}
        style={{ backgroundColor: colors.background }}
        animationConfigs={{
          duration: 400,
        }}
        backdropComponent={renderBackdrop}
        index={-1}>
        <BottomSheetView>
          <Box px="s16">
            <Text semiBold>Categories</Text>
          </Box>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={selectPriorityModalRef}
        enablePanDownToClose
        snapPoints={['40%']}
        backgroundStyle={{ backgroundColor: colors.addButtonTaskBackground }}
        style={{ backgroundColor: colors.background }}
        animationConfigs={{
          duration: 400,
        }}
        backdropComponent={renderBackdrop}
        index={-1}>
        <BottomSheetView>
          <Box px="s16">
            <Text semiBold>Priority</Text>
          </Box>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

import React from 'react';

import {
  Box,
  Button,
  FormTextInput,
  RenderIf,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
import { AppScreenProps } from '@routes';

import { useCreateLocationScreen } from './useCreateLocationScreen';

export function CreateLocationScreen({}: AppScreenProps<'CreateLocationScreen'>) {
  const {
    control,
    onSubmit,
    isFormLoading,
    isFormValid,
    handleSelectPlanet,
    selectedPlanet,
  } = useCreateLocationScreen();

  function renderAddressFields() {
    return (
      <>
        <FormTextInput
          control={control}
          label="Street"
          name="address.street"
          placeholder="Ex: Groove Street"
        />

        <FormTextInput
          control={control}
          label="City"
          name="address.city"
          placeholder="Ex: Los Santos"
        />

        <FormTextInput
          control={control}
          label="State"
          name="address.state"
          placeholder="Ex: San Andreas"
        />
      </>
    );
  }

  function renderLotNumberField() {
    return (
      <FormTextInput
        control={control}
        label="Lot Number"
        name="lotNumber"
        description="This is a unique number for the storage location"
        disabled
        editable={false}
        pointerEvents="none"
      />
    );
  }

  function renderOptionsButton() {
    const mapButtonOptions: Array<{
      label: 'Earth' | 'Mars';
      onPress: () => void;
    }> = [
      {
        label: 'Earth',
        onPress: () => handleSelectPlanet('earth'),
      },
      {
        label: 'Mars',
        onPress: () => handleSelectPlanet('mars'),
      },
    ];

    return (
      <Box flexDirection="row" gap="s8" flex={1}>
        {mapButtonOptions.map(({ label, onPress }) => {
          const isSelected = selectedPlanet === label.toLocaleLowerCase();

          return (
            <TouchableOpacityBox
              key={label}
              onPress={onPress}
              alignItems="center"
              justifyContent="center"
              height={46}
              flex={1}
              px="s8"
              borderRadius="s16"
              borderWidth={2}
              borderColor={isSelected ? 'primary' : 'neutral500'}>
              <Text semiBold color={isSelected ? 'primary' : 'neutral500'}>
                {label}
              </Text>
            </TouchableOpacityBox>
          );
        })}
      </Box>
    );
  }

  return (
    <Screen
      scrollable
      title="Create Location"
      canGoBack
      FooterComponent={
        <Button
          text="Create"
          loading={isFormLoading}
          disabled={!isFormValid}
          onPress={onSubmit}
        />
      }
      footerContainerStyle={{ padding: 24 }}>
      <Box mb="s24" gap="s4">
        <Text preset="headingMedium">Address location</Text>
        <Text>
          Complete address would assist in locating the storage location
        </Text>
      </Box>

      <Box>
        <Text mb="s8">
          Select the planet where the storage location is located. This will
          help in categorizing the storage location.
        </Text>

        <Box flexDirection="row" gap="s8">
          {renderOptionsButton()}
        </Box>
      </Box>

      <Box gap="s16" mt="s24">
        <RenderIf
          condition={selectedPlanet === 'mars'}
          render={renderLotNumberField()}
        />

        <FormTextInput
          control={control}
          label="Name"
          name="name"
          placeholder="Ex: Center Storage"
        />

        <RenderIf
          condition={selectedPlanet === 'earth'}
          render={renderAddressFields()}
        />
      </Box>
    </Screen>
  );
}

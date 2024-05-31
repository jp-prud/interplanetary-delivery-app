import React from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BaseLocaion } from '@types';

import {
  Box,
  Button,
  Screen,
  StorageLocationItem,
  Text,
  TitleBar,
} from '@components';
import { useBottomSheet } from '@hooks';
import { AppScreenProps } from '@routes';

import { LocationDetails } from './components';
import { useHomeScreen } from './useHomeScreen';

export function HomeScreen({ navigation }: AppScreenProps<'HomeScreen'>) {
  const {
    listLocationsData,
    isLoading,
    selectedLocationId,
    onSelectLocation,
    onClearSelectedLocation,
    listLocationsRefetch,
  } = useHomeScreen();

  const {
    bottomSheetRef,
    BOTTOM_SHEET_STYLES,
    renderBackdrop,
    onOpen,
    onClose,
  } = useBottomSheet();

  function renderItem({ item }: ListRenderItemInfo<BaseLocaion>) {
    return (
      <StorageLocationItem
        location={item}
        onHandlePressDetailsLocation={locationId => {
          onSelectLocation(locationId);

          onOpen();
        }}
      />
    );
  }

  function renderEmptyList() {
    return (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <Text preset="paragraphMedium" color="neutral700" mb="s16" bold>
          No locations found
        </Text>

        <Button
          text="Add"
          onPress={() => navigation.navigate('CreateLocationScreen')}
        />
      </Box>
    );
  }

  return (
    <Screen isLoading={isLoading}>
      <Box mb="s32">
        <Text preset="headingMedium">Storage address</Text>
        <Text>Overview options to storage address</Text>
      </Box>

      <FlatList
        ListHeaderComponent={
          <TitleBar
            title="Address"
            linkText="Add address"
            onPress={() => navigation.navigate('CreateLocationScreen')}
            hasIcon
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={listLocationsRefetch}
          />
        }
        data={listLocationsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ gap: 16, flex: 1 }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        onClose={onClearSelectedLocation}
        snapPoints={['50%']}
        backdropComponent={renderBackdrop}
        animationConfigs={{
          duration: 400,
        }}
        containerStyle={BOTTOM_SHEET_STYLES.container}
        index={-1}>
        <BottomSheetView>
          <LocationDetails
            locationId={selectedLocationId!}
            onHandleClose={onClose}
          />
        </BottomSheetView>
      </BottomSheet>
    </Screen>
  );
}

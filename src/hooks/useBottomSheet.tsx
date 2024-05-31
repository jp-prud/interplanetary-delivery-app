import { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

export function useBottomSheet() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const onClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const onOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const BOTTOM_SHEET_STYLES = StyleSheet.create({
    container: {
      zIndex: 2,
    },
    contentContainer: {
      zIndex: 1,
    },
  });

  return {
    BOTTOM_SHEET_STYLES,
    bottomSheetRef,
    renderBackdrop,
    onClose,
    onOpen,
  };
}

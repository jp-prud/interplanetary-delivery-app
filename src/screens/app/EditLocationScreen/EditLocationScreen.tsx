import { Box, Button, FormTextInput, Screen } from '@components';
import { AppScreenProps } from '@routes';

import { useEditLocationScreen } from './useEditLocationScreen';

export function EditLocationScreen({
  route,
}: AppScreenProps<'EditLocationScreen'>) {
  const { locationId } = route.params;

  const {
    locationData,
    isLoading,
    control,
    onSubmit,
    isSubmitting,
    isFormValid,
  } = useEditLocationScreen(locationId);

  const { planet } = locationData;

  function renderAddressForm() {
    return (
      <>
        <FormTextInput control={control} name="address.street" label="Street" />
        <FormTextInput control={control} name="address.city" label="City" />
        <FormTextInput
          control={control}
          name="address.country"
          label="Country"
        />
      </>
    );
  }

  return (
    <Screen
      isLoading={isLoading}
      title="Location edit"
      FooterComponent={
        <Button
          onPress={() => onSubmit()}
          text="Confirmar edição"
          loading={isSubmitting}
          disabled={!isFormValid}
        />
      }
      footerContainerStyle={{ paddingHorizontal: 24 }}
      canGoBack>
      <Box gap="s16">
        {planet === 'mars' && (
          <FormTextInput
            control={control}
            name="lotNumber"
            label="Lot number"
            disabled
            pointerEvents="none"
          />
        )}
        <FormTextInput control={control} name="name" label="Name" />
        {planet === 'earth' && renderAddressForm()}
      </Box>
    </Screen>
  );
}

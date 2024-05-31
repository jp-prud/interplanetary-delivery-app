import { LocationService } from '@services';
import { waitFor } from '@testing-library/react-native';
import { StorageMocks, renderHook } from '@tests';

import { useGetLocationByIdUseCase } from '../useGetLocationByIdUseCase';

describe('useGetLocationByIdUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get location by id', async () => {
    const { result } = renderHook(() => useGetLocationByIdUseCase('1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { locationData, isLoading, error } = result.current;

    expect(locationData).toEqual(StorageMocks[0]);
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  it.skip('should handle error when fetching data', async () => {
    const errorMessage = 'Error when fetching data';
    const errorObject = new Error(errorMessage);

    LocationService.mockReturnValue({
      getLocationById: jest.fn().mockRejectedValue(errorObject),
    });

    const { result } = renderHook(() => useGetLocationByIdUseCase('1'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { locationData, isLoading, error } = result.current;

    expect(locationData).toBeUndefined();
    expect(isLoading).toBe(false);
    expect(errorObject).toEqual(error);
  });
});

import { LocationService } from '@services';
import { StorageMocks, act, renderHook, waitFor } from '@tests';

import { useListLocationsUseCase } from '../useListLocationsUseCase';

describe('useListLocationsUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should list all locations', async () => {
    const { result } = renderHook(() => useListLocationsUseCase());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { listLocationsData, error } = result.current;

    expect(listLocationsData).toEqual(StorageMocks);
    expect(error).toBeNull();
  });

  it('should handle refetching data', async () => {
    const { result } = renderHook(() => useListLocationsUseCase());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.listLocationsRefetch();
    });

    const { isLoading, error, listLocationsData } = result.current;

    expect(isLoading).toBe(false);
    expect(listLocationsData).toEqual(StorageMocks);
    expect(error).toBeNull();
  });

  it.skip('should handle error when fetching data', async () => {
    jest.mock('@services');

    const errorMessage = 'Error when fetching data';
    const errorObject = new Error(errorMessage);

    LocationService.mockReturnValue({
      listLocations: jest.fn().mockRejectedValue(errorObject),
    });

    const { result } = renderHook(() => useListLocationsUseCase());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { listLocationsData, error } = result.current;

    expect(listLocationsData).toBeUndefined();
    expect(errorObject).toEqual(error);
  });
});

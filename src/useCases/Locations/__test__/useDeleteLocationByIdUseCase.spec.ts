import { waitFor } from '@testing-library/react-native';
import { renderHook } from '@tests';

import { useDeleteLocationUseCase } from '../useDeleteLocationUseCase';

describe('useDeleteLocationByIdUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should delete location by id', async () => {
    const { result } = renderHook(() => useDeleteLocationUseCase());

    await waitFor(() => result.current.deleteLocation('1'));

    await waitFor(() => expect(result.current.isPending).toBe(false));

    const { isError } = result.current;

    expect(isError).toBe(false);
  });
});

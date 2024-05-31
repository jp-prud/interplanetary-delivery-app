import { BASE_URL } from '@services';
import { BaseLocation } from '@types';
import { cloneDeep } from 'lodash';
import { HttpResponse, http } from 'msw';

import { StorageMocks } from '../mocks/';

let inMemoryStorage = cloneDeep(StorageMocks);

export function resetInMemoryResponse() {
  inMemoryStorage = cloneDeep(StorageMocks);
}

export const handlers = [
  // LOCATIONS
  http.get(`${BASE_URL}locations`, (req, resp, ctx) => {
    return HttpResponse.json(inMemoryStorage);
  }),

  http.get(`${BASE_URL}locations/:locationId`, (req, resp, ctx) => {
    return HttpResponse.json(StorageMocks[0]);
  }),

  http.delete<{ locationId: BaseLocation['id'] }>(
    `${BASE_URL}locations/:locationId`,
    ({ params }) => {
      console.log(params);
      const { locationId } = params;

      inMemoryStorage = inMemoryStorage.filter(
        location => location.id !== locationId,
      );

      return HttpResponse.json(
        {
          message: 'Location deleted',
        },
        {
          status: 200,
        },
      );
    },
  ),
];

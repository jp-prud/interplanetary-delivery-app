import { generateLotNumber } from '@utils';
import { z } from 'zod';

const LocationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  planet: z.enum(['earth', 'mars']),
});

export const CreateMarsLocationFormSchema = z.object({
  lotNumber: z.string(),
});

export const CreateEarthLocationFormSchema = z.object({
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});

export const CreateLocationFormSchema = z
  .discriminatedUnion('planet', [
    z.object({
      planet: z.literal('earth'),
      ...CreateEarthLocationFormSchema.shape,
    }),
    z.object({
      planet: z.literal('mars'),
      ...CreateMarsLocationFormSchema.shape,
    }),
  ])
  .and(LocationSchema);

export type CreateLocationFormSchemaTypes = z.infer<
  typeof CreateLocationFormSchema
>;

export const CREATE_MARS_LOCATION_DEFAULT_VALUES: CreateLocationFormSchemaTypes =
  {
    name: '',
    planet: 'mars',
    lotNumber: String(generateLotNumber()),
  };

export const CREATE_EARTH_LOCATION_DEFAULT_VALUES: CreateLocationFormSchemaTypes =
  {
    name: '',
    planet: 'earth',
    address: {
      street: '',
      city: '',
      country: '',
    },
  };

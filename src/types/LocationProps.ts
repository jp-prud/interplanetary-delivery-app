export interface MarsLocation {
  lotNumber: string;
}

export interface EarthLocation {
  address: {
    country: string;
    city: string;
    street: string;
  };
}

export interface BaseLocation {
  id: string;
  name: string;
  planet: 'earth' | 'mars';
}

export type Location<T> = BaseLocation & T;

export type EarthLocationType = Location<EarthLocation>;

export type MarsLocationType = Location<MarsLocation>;

export type ListLocation = EarthLocationType | MarsLocationType;

export type CreateLocationDTO<T> = Omit<Location<T>, 'id'>;

export type UpdateLocationDTO<T> = Omit<Location<T>, 'id' | 'planet'>;

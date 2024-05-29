import { PlanetProps } from '@types';

export function PlanetService() {
  async function getPlanetById(planetId: string) {}

  async function listPlanets() {}

  async function createPlanet(planet: PlanetProps) {}

  async function deletePlanetById(planetId: string) {}

  return {
    getPlanetById,
    listPlanets,
    createPlanet,
    deletePlanetById,
  };
}

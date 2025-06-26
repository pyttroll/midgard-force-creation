import Force from './Force'
import Hero from './Hero'
import { HeroStatuses } from './HeroStatuses'
import HeroTrait, { HeroTraits } from './HeroTrait'
import Unit from './Unit'
import UnitProfiles from './UnitProfiles'
import UnitTrait, { UnitTraits } from './UnitTrait'

export function loadForces() {
  const forcesJSON = localStorage.getItem('forces')
  let forces: Array<Force> = []
  let customHeroTraits: Array<HeroTrait> = []
  let customUnitTraits: Array<UnitTrait> = []
  if (forcesJSON == null) {
    forces = sampleForces
    saveForces({ forces, customHeroTraits, customUnitTraits })
  } else {
    const apiForces = JSON.parse(forcesJSON)
    try {
      forces = apiForces.forces.map((force) => Force.fromApi(force))
      customHeroTraits = apiForces.customHeroTraits.map((trait) => HeroTrait.fromObject(trait))
      customUnitTraits = apiForces.customUnitTraits.map((trait) => UnitTrait.fromObject(trait))
    } catch (e) {
      console.log(e)

      forces = sampleForces
      saveForces({
        forces: forces,
        customHeroTraits: customHeroTraits,
        customUnitTraits: customUnitTraits,
      })
    }
  }
  return { forces, customHeroTraits, customUnitTraits }
}

export function saveForces({ forces, customHeroTraits, customUnitTraits }) {
  let apiForces
  try {
    apiForces = forces.map((force) => force.toApi())
  } catch (e) {
    console.error('Failed to convert forces to API models')
    throw e
  }

  let apiCustomHeroTraits
  try {
    apiCustomHeroTraits = customHeroTraits.map((trait) => trait.toApi())
  } catch (e) {
    console.error('Failed to convert custom hero traits to API models')
    throw e
  }

  let apiCustomUnitTraits
  try {
    apiCustomUnitTraits = customUnitTraits.map((trait) => trait.toApi())
  } catch (e) {
    console.error('Failed to convert custom unit traits to API models')
    throw e
  }

  let json
  try {
    json = JSON.stringify({
      forces: apiForces,
      customHeroTraits: apiCustomHeroTraits,
      customUnitTraits: apiCustomUnitTraits,
    })
  } catch (e) {
    console.error('Failed to serialize forces')
    throw e
  }

  localStorage.setItem('forces', json)
}

const sampleForces = [
  new Force(
    null,
    'Artos and the Britons (300 points)',
    [
      new Hero(
        'Artos, Warlord of the Britons',
        HeroStatuses.MajorHero,
        [
          HeroTraits.ArmyCommander,
          HeroTraits.FavourOfTheGods,
          HeroTraits.LegendaryWeapon,
          HeroTraits.Mounted,
        ],
        undefined,
        1,
        undefined,
      ),
      new Hero(
        'Bedwyr, Artos’ War Leader',
        HeroStatuses.MajorHero,
        [HeroTraits.Mounted, HeroTraits.TodayWeFightToWin],
        undefined,
        1,
        undefined,
      ),
      new Hero(
        'Kai, Artos’ Half-Brother',
        HeroStatuses.MinorHero,
        [HeroTraits.BattleSmiter, HeroTraits.Mounted, HeroTraits.WithMe],
        undefined,
        1,
        undefined,
      ),
    ],
    [
      new Unit(
        'Comitatus on Foot',
        1,
        UnitProfiles.WarriorsHeavyInfantry,
        [UnitTraits.Drilled, UnitTraits.SpearsAsTribute, UnitTraits.Steadfast],
        [UnitProfiles.WarriorsHeavyInfantry.options[1]],
      ),
      new Unit(
        'Mounted Comitatus',
        2,
        UnitProfiles.HeavyRidersMediumCavalry,
        [UnitTraits.Drilled, UnitTraits.SpearsAsTribute],
        [],
      ),
      new Unit('Pedyt Spearmen', 3, UnitProfiles.WarriorsHeavyInfantry, [], []),
      new Unit(
        'Tribal Warriors',
        3,
        UnitProfiles.WarriorsHeavyInfantry,
        [UnitTraits.Brittle, UnitTraits.Impetuous],
        [UnitProfiles.WarriorsHeavyInfantry.options[0]],
      ),
      new Unit(
        'Scouts',
        1,
        UnitProfiles.SkirmishersShooters,
        [],
        [UnitProfiles.SkirmishersShooters.options[2]],
      ),
    ],
  ),
  new Force(
    null,
    'Aelle’s Saxon Raiders (300 points)',
    [
      new Hero(
        'Aelle, Saxon Cyning',
        HeroStatuses.MajorHero,
        [HeroTraits.ArmyCommander, HeroTraits.Fearsome, HeroTraits.TodayWeFightToWin],
        undefined,
        1,
        undefined,
      ),
      new Hero(
        'Hussa, Saxon Thegn',
        HeroStatuses.MinorHero,
        [HeroTraits.BattleSmiter, HeroTraits.HoldFast],
        undefined,
        1,
        undefined,
      ),
      new Hero(
        'Eanfrith, Saxon Thegn',
        HeroStatuses.MinorHero,
        [HeroTraits.BattleSmiter],
        undefined,
        1,
        undefined,
      ),
      new Hero(
        'Osric, Saxon Champion',
        HeroStatuses.Champion,
        [HeroTraits.BattleSmiter, HeroTraits.FavourOfTheGods, HeroTraits.Proud],
        undefined,
        1,
        undefined,
      ),
    ],
    [
      new Unit(
        'Gedriht (Hearthguard)',
        2,
        UnitProfiles.WarriorsHeavyInfantry,
        [UnitTraits.Drilled, UnitTraits.SpearsAsTribute, UnitTraits.Steadfast],
        [UnitProfiles.WarriorsHeavyInfantry.options[1]],
      ),
      new Unit('Duguth (Veteran Spearmen)', 4, UnitProfiles.WarriorsHeavyInfantry, [], []),
      new Unit(
        'Geoguth (Young Warriors)',
        2,
        UnitProfiles.WarriorsHeavyInfantry,
        [UnitTraits.Impetuous],
        [UnitProfiles.WarriorsHeavyInfantry.options[0]],
      ),
      new Unit(
        'Slingers',
        2,
        UnitProfiles.SkirmishersShooters,
        [],
        [UnitProfiles.SkirmishersShooters.options[2]],
      ),
    ],
  ),
]

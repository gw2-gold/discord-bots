interface DisplayNameMap {
  [key: string]: string
}

const displayNames: DisplayNameMap = {
  Fractal: 'Fractals',
  Missions: 'Guild Missions',
  PvP: 'PvP',
  Raid: 'Raids',
  WvW: 'WvW'
}

const getDisplayNameForGameType = (gameType: string): string => {
  return displayNames[gameType]
}

export default getDisplayNameForGameType

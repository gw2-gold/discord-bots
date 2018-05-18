interface DisplayNameMap {
  [key: string]: string
}

const displayNames: DisplayNameMap = {
  Fractal: 'Fractals',
  Mission: 'Guild Missions',
  PvP: 'PvP',
  Raid: 'Raids',
  WvW: 'WvW'
}

const getDisplayNameForGameType = (gameType: string): string => {
  return displayNames[gameType]
}

export default getDisplayNameForGameType

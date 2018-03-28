// Types
import { Command, Embed } from '../common/types'

import { tab } from '../utilities/constants'

const description = "I'll send you some helpful/relevant GW2 links!"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Sites',
    fields: [
      {
        name: 'Must Haves',
        value: [
          `|${tab} Everything you need to know about GW2: https://wiki.guildwars2.com/wiki/Main_Page`,
          `|${tab} An interactive map with world boss locations and more: http://gw2timer.com/`,
          `|${tab} App that reads data about your account and provides you with more data: http://gw2timer.com/?page=Account`,
          `|${tab} Farming guide: http://pwniversity.com/gw2/farming`,
          `|${tab} Fractal Professions and Mechanics: https://discretize.eu/`
        ].join('\n')
      },
      {
        name: 'Handy Sites',
        value: [
          `|${tab} Step-by-step crafting guides: http://gw2crafts.net/`,
          `|${tab} Current Meta Builds: http://metabattle.com/wiki/MetaBattle_Wiki`,
          `|${tab} GW2 Reddit: https://www.reddit.com/r/GuildWars2/`
        ].join('\n')
      },
      {
        name: 'Other Sites',
        value: [
          `|${tab} WvW matchups: http://mos.millenium.org/na/matchups/`,
          `|${tab} Armor Gallery: http://argos-soft.net/GW2/ArmorGallery/index.php`
        ].join('\n')
      },
      {
        name: 'Ease of Life',
        value: [
          `|${tab} Build editor: http://en.gw2skills.net/`,
          `|${tab} Live WvW map: https://wvwintel.com/`,
          `|${tab} Builds and Guides: http://intothemists.com/`,
          `|${tab} Alternate World Boss Timer: http://timer.silversunshine.net/`
        ].join('\n')
      }
    ]
  }
}

const command: Command = { description, fn, shouldDM }

export default command

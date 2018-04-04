// Types
import { Command, Embed } from '../common/types'

import { stripIndent } from 'common-tags'

const description = "I'll send you some helpful/relevant GW2 links!"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Sites',
    fields: [
      {
        name: 'Must Haves',
        value: stripIndent`
          |  Everything you need to know about GW2: https://wiki.guildwars2.com/wiki/Main_Page
          |  An interactive map with world boss locations and more: http://gw2timer.com/
          |  App that reads data about your account and provides you with more data: http://gw2timer.com/?page=Account
          |  Farming guide: http://pwniversity.com/gw2/farming
          |  Fractal Professions and Mechanics: https://discretize.eu/
        `
      },
      {
        name: 'Handy Sites',
        value: stripIndent`
          |  Step-by-step crafting guides: http://gw2crafts.net/
          |  Current Meta Builds: http://metabattle.com/wiki/MetaBattle_Wiki
          |  GW2 Reddit: https://www.reddit.com/r/GuildWars2/
        `
      },
      {
        name: 'Other Sites',
        value: stripIndent`
          |  WvW matchups: http://mos.millenium.org/na/matchups/
          |  Armor Gallery: http://argos-soft.net/GW2/ArmorGallery/index.php
        `
      },
      {
        name: 'Ease of Life',
        value: stripIndent`
          |  Build editor: http://en.gw2skills.net/
          |  Live WvW map: https://wvwintel.com/
          |  Builds and Guides: http://intothemists.com/
          |  Alternate World Boss Timer: http://timer.silversunshine.net/
        `
      }
    ]
  }
}

const command: Command = { description, fn, shouldDM }

export default command

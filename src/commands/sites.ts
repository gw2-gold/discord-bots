// Types
import { Command, Response } from '../common/types'
import { Message } from 'discord.js'

import { tab } from '../constants'

const description = "I'll send you some helpful/relevant GW2 links!"
const shouldDM = false
const fn = (message: Message): Response => {
  return [
    `${message.author}, here are some help sites:`,
    '**Must Haves**',
    `${tab}- Everything you need to know about GW2: https://wiki.guildwars2.com/wiki/Main_Page`,
    `${tab}- An interactive map with world boss locations and more: http://gw2timer.com/`,
    `${tab}- App that reads data about your account and provides you with more data: http://gw2timer.com/?page=Account`,
    `${tab}- Farming guide: http://pwniversity.com/gw2/farming`,
    `${tab}- Fractal Professions and Mechanics: https://discretize.eu/`,
    '**Handy sites**',
    `${tab}- Step-by-step crafting guides: http://gw2crafts.net/`,
    `${tab}- Current Meta Builds: http://metabattle.com/wiki/MetaBattle_Wiki`,
    `${tab}- GW2 Reddit: https://www.reddit.com/r/GuildWars2/`,
    '**Other sites**',
    `${tab}- WvW matchups: http://mos.millenium.org/na/matchups/`,
    `${tab}- Armor Gallery: http://argos-soft.net/GW2/ArmorGallery/index.php`,
    '**Ease of Life**',
    `${tab}- Build editor: http://en.gw2skills.net/`,
    `${tab}- Live WvW map: https://wvwintel.com/`,
    `${tab}- Builds and Guides: http://intothemists.com/`,
    `${tab}- Alternate World Boss Timer: http://timer.silversunshine.net/`
  ]
}

const command: Command = { description, fn, shouldDM }

export default command

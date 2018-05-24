// Types
import { ApiGuildMember } from '../common/types'
import { TextChannel } from 'discord.js'

import moment from 'moment'
import getGuild from './get-guild'
import getInGameGuildMembers from './get-in-game-guild-members'

const checkIfSquiresRequirePromotion = async () => {
  const members: ApiGuildMember[] = await getInGameGuildMembers()
  const squires: ApiGuildMember[] = []
  const now = moment.utc()

  members.forEach(member => {
    if (member.rank !== 'Squire') {
      return
    }

    if (moment.utc(member.joined).diff(now, 'months') >= 1) {
      squires.push(member)
    }
  })

  if (squires.length > 0) {
    const guild = getGuild()
    const channel: TextChannel = <TextChannel>guild.channels.find(
      'name',
      'officers'
    )

    channel.send({
      embed: {
        title: 'Members who probably need to be promoted to Knight',
        fields: squires.map(squire => ({
          name: squire.name,
          value: moment.utc(squire.joined).from(now),
          inline: true
        }))
      }
    })
  }
}

export default checkIfSquiresRequirePromotion

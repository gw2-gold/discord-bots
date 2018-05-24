import { ApiGuildMember, Command } from '../common/types'
import { Message, GuildChannel } from 'discord.js'

import moment from 'moment'
import getGuildMember from '../utilities/get-guild-member'
import getInGameGuildMembers from '../utilities/get-in-game-guild-members'
import isOfficer from '../utilities/is-officer'

const description = 'I will look up a member in the guild by account name'
const shouldDM = false
const fn = async (message: Message, [accountName]: [string]) => {
  if (!isOfficer(getGuildMember(message.author))) {
    return {
      title: 'Only Officers can get info on guild members'
    }
  }

  if ((<GuildChannel>message.channel).name !== 'officers') {
    return {
      title: 'This command can only be used in the officers channel'
    }
  }

  const data: ApiGuildMember[] = await getInGameGuildMembers()

  const apiMember = data.find(member => member.name === accountName)

  if (!apiMember) {
    return {
      title: `${accountName} is not a part of the guild. If this person is part of the guild, please check your spelling of the account name.`
    }
  }

  return {
    title: 'Member Info',
    fields: [
      {
        name: 'Account Name',
        value: apiMember.name
      },
      {
        name: 'Rank',
        value: apiMember.rank
      },
      {
        name: 'Joined',
        value: moment.utc(apiMember.joined).from(moment.utc())
      }
    ]
  }
}

const command: Command = { description, fn, shouldDM }

export default command

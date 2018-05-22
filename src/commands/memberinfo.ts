import { ApiGuildMember, Command } from '../common/types'
import { Message, GuildChannel } from 'discord.js'

import moment from 'moment'
import fetch from 'node-fetch'
import getGuildMember from '../utilities/get-guild-member'
import isOfficer from '../utilities/is-officer'

const { LEADER_TOKEN } = process.env

if (!LEADER_TOKEN) {
  throw new Error('LEADER_TOKEN is a required Environment Variable')
}

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

  const data: ApiGuildMember[] = await fetch(
    `https://api.guildwars2.com/v2/guild/0D74FD50-8CC6-E511-80D4-E4115BDFF975/members?access_token=${LEADER_TOKEN}`
  ).then(response => response.json())

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

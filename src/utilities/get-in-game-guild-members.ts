// Types
import { ApiGuildMember } from '../common/types'

import fetch from 'node-fetch'

const { LEADER_TOKEN } = process.env

if (!LEADER_TOKEN) {
  throw new Error('LEADER_TOKEN is a required Environment Variable')
}

const getInGameGuildMembers = async () => {
  const data: ApiGuildMember[] = await fetch(
    `https://api.guildwars2.com/v2/guild/0D74FD50-8CC6-E511-80D4-E4115BDFF975/members?access_token=${LEADER_TOKEN}`
  ).then(response => response.json())

  return data
}

export default getInGameGuildMembers

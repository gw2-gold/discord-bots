import { Emoji, ReactionEmoji } from 'discord.js'

export interface Command {
  description: string
  fn: Function
  shouldDM: boolean
}

export interface CommandWithSubCommand {
  [key: string]: Command
}

export interface Commands {
  [key: string]: Command | CommandWithSubCommand
}

export interface Embed {
  description?: string
  fields?: EmbedField[]
  footer?: EmbedFooter
  title: string
  url?: string
}

export interface EmbedField {
  inline?: boolean
  name: string
  value: string
}

export interface EmbedFooter {
  text: string
}

export interface MemberSignup {
  emojis: (Emoji | ReactionEmoji)[]
  name: string
}

export interface MemberSignups {
  [key: string]: MemberSignup
}

export interface Schedule extends Array<any> {
  schedule: ScheduledDay[]
  cancelledDates: string[]
  isPermanentlyCancelled: boolean
}

export interface ScheduledDay {
  day: number
  hour: number
  minute: number
}

export interface ApiGuildMember {
  name: string
  rank: string
  joined: string
}

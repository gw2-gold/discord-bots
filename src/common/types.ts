import { Emoji, ReactionEmoji } from 'discord.js'

export interface Command {
  description: string
  fn: Function
  shouldDM: boolean
}

export interface CommandsWithSubCommands {
  [key: string]: CommandWithSubCommand
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

export interface Event {
  date: string
  title: string
}

export interface MemberSignup {
  emojis: (Emoji | ReactionEmoji)[]
  name: string
}

export interface MemberSignups {
  [key: string]: MemberSignup
}

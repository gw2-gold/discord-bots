export interface Command {
  description: string
  fn: Function
  shouldDM: boolean
}

export interface Commands {
  [key: string]: Command
}

export interface Embed {
  description?: string
  fields?: EmbedField[]
  footer?: EmbedFooter
  title: string
  url?: string
}

export interface EmbedField {
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

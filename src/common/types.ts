export interface Event {
  date: string
  title: string
}

export interface Command {
  description: string
  fn: Function
  shouldDM: boolean
}

export interface Commands {
  [key: string]: Command
}

export interface Response extends Array<string | undefined> {}

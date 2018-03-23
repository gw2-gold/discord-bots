import { Command, Commands } from './common/types'

const commandHasSubCommand = (commands: Commands, commandName: string) => {
  const command = commands[commandName]

  return (
    (<Command>command).description === undefined &&
    (<Command>command).fn === undefined &&
    (<Command>command).shouldDM === undefined
  )
}

export default commandHasSubCommand

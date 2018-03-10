//Types
import { Command, Embed } from '../common/types'

const description = "I'll send you the link to the guild rules"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Please adhere to the rules of the guild',
    description: [
      'They can be found here: https://docs.google.com/document/d/13gOKdF8gcgQ7AfEvSGbR4wlE9-H03Tvjy3md4WdiDug/edit'
    ].join('\n')
  }
}

const command: Command = { description, fn, shouldDM }

export default command

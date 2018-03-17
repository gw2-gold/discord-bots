//Types
import { Command, Embed } from '../common/types'

const description = "I'll send you the link to the guild rules"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Full Rule Details',
    description:
      'So that we can all have an amazing time together, please adhere to the rules :smiley:',
    url:
      'https://docs.google.com/document/d/13gOKdF8gcgQ7AfEvSGbR4wlE9-H03Tvjy3md4WdiDug'
  }
}

const command: Command = { description, fn, shouldDM }

export default command

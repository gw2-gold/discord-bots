// Types
import { Command, Embed } from '../common/types'

const description =
  "I'll send you info about the guild ranks and a link for more details"
const shouldDM = false
const fn = (): Embed => {
  return {
    title: 'Grand Master',
    description: 'Reserved for the Guild Leaders, Sakkuth and Zara',
    fields: [
      {
        name: 'High Councillor',
        value: 'Senior Officer'
      },
      {
        name: 'Kings Guard',
        value: 'Junior Officer'
      },
      {
        name: 'Knight',
        value: 'The core ouf our guild. Been in [GOLD] for at least 1 month'
      },
      {
        name: 'Squire',
        value: "Starting Rank. Don't worry, you are still awesome :)"
      },
      {
        name: 'Pilgrim',
        value: 'Inactive (2 months) members are placed here'
      }
    ],
    footer: {
      text:
        'More details can be found here:\nhttps://docs.google.com/document/d/1PZcuT8VsBJBkDQ3iEx19WP5SChymnCQBI-pTKKb-EB4'
    }
  }
}

const command: Command = { description, fn, shouldDM }

export default command

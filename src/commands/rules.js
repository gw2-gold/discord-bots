const description = "I'll send you the link to the guild rules"
const shouldDM = false
const fn = message => {
  return [
    'Please adhere to the rules of the guild.',
    'They can be found here: https://docs.google.com/document/d/13gOKdF8gcgQ7AfEvSGbR4wlE9-H03Tvjy3md4WdiDug/edit'
  ]
}

module.exports = { description, fn, shouldDM }

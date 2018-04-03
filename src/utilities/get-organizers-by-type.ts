const getOrganizersByType = (type: string): string[] => {
  const organizers =
    process.env[`${type.replace(' ', '_').toUpperCase()}_ORGANIZERS`]

  if (!organizers) {
    throw new Error(
      `process.env.${type.toUpperCase()}_ORGANIZERS is not defined`
    )
  }

  return organizers.split(',')
}

export default getOrganizersByType

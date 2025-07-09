import _ from 'lodash'

export function generateHexId() {
  return Math.floor(Math.random() * 0x10000)
    .toString(16)
    .padStart(4, '0')
}

export function createUniqueIdentifier(baseName) {
  const hexId = generateHexId()
  return `${_.camelCase(baseName)}-${hexId}`
}

export function formatString(str, limit = 20) {
  if (typeof str !== 'string') {
    return ''
  }

  if (str.length < limit) {
    return str
  }

  // Trim to first 20 characters
  let trimmed = str.slice(0, limit)

  // Find the last space in the trimmed string
  let lastSpaceIndex = trimmed.lastIndexOf(' ')

  // If a space is found, cut to that space
  // Otherwise, return the original 20-character trim
  if (lastSpaceIndex !== -1) {
    trimmed = _.startCase(trimmed.slice(0, lastSpaceIndex))
  }

  // Add ellipsis
  return trimmed + '...'
}

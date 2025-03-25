export const shortenAddress = (
  address: string,
  chars = 4
): string => {
  if (!address) {
    return ''
  }

  if (!address.includes('k:') && address.length <= 20) {
    return address
  }

  return `${address.slice(0, chars)}...${address.slice(
    -chars
  )}`
}

export const shortenString = (
  string: string,
  chars = 4
): string => {
  if (!string) {
    return ''
  }

  return `${string.slice(0, chars)}...${string.slice(
    -chars
  )}`
}

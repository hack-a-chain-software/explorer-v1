export const useLatestTransfer = (transfers: any[]) => {
  const nodeLength = transfers.length || 0

  const transferIndex = Math.max(nodeLength - 1, 0)

  return transfers[transferIndex]
}

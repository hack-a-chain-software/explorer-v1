export const useTransactionStatus = (result: string) => result.includes('\"status\":\"success\"') ? 'success' : 'error'

export const useTransactionPubkey = (data: string) => {
  if (!data) {
    return null
  }

  const parsedData = JSON.parse(data || '{}')

  const [ first ] = parsedData.keyset?.keys || parsedData.ks?.keys || []

  return first
}

export const useTransactionSigs = (sigs: string) => JSON.parse(sigs)

export const useTransactionGas = (transfers: any []) => transfers[0]

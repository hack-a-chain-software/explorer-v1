import { unknownToken, staticTokens } from '../constants/tokens'

export const transformRawBalances = ({
  prices,
  allBalances,
}: any) => {
  if (!allBalances) {
    return []
  }

  const balancesObj = allBalances.nodes
    .sort((a: any, b: any) => a.chainId - b.chainId)
    .reduce((prev: any, current: any) => {
      const {
        balance,
        module = '',
      } = current || {}

      const formatedModule = current.module === 'coin' ? 'kadena' : current.module

      const metadata = staticTokens.find(({ module }) => current.module === module)  || unknownToken

      const etl = prices?.find(({ id }: any) => formatedModule.includes(id))

      if (!prev[module]) {
        prev[module] = {
          module,
          metadata,
          balance: 0,
          balances: [],

          ...etl,
        }
      }

      prev[module].balance = prev[module].balance + Number(balance)

      prev[module].balances.push({
        ...etl,
        ...current,
      })

      return prev
    }, {})

  return Object.values(balancesObj).sort((a: any, b: any) => {
    return (b.current_price || 0) - (a.current_price || 0)
  })
}

import { blockchainTooltipData } from "./tooltips"

export const trendingTokensTableColumns = [
  {
    cols: 1,
    key: 'ranking',
    label: '#',
  },
  {
    cols: 5,
    key: 'token',
    label: 'Token',
  },
  {
    cols: 3,
    key: 'price',
    label: 'Price',
  },
  {
    cols: 5,
    center: true,
    key: 'change',
    label: 'Change (%)',
    description: blockchainTooltipData.trendingTokens.change
  },
  {
    cols: 4,
    key: 'volume',
    label: 'Volume (24h)',
    description: blockchainTooltipData.trendingTokens.volume
  },
  {
    cols: 3,
    key: 'marketCap',
    label: 'Market Cap',
    description: blockchainTooltipData.trendingTokens.marketCap
  },
  {
    cols: 3,
    key: 'supply',
    label: 'Circulating Supply',
    description: blockchainTooltipData.trendingTokens.circulatingSupply
  },
]

export const tokenTransfersTableColumns = [
  {
    cols: 2,
    key: 'requestkey',
    label: 'Hash',
    description: blockchainTooltipData.tokenTransfers.hash
  },
  {
    center: true,
    cols: 3,
    key: 'method',
    label: 'Method',
    description: blockchainTooltipData.tokenTransfers.method
  },
  {
    cols: 4,
    key: 'from',
    label: 'From',
    description: blockchainTooltipData.tokenTransfers.from
  },
  {
    cols: 4,
    key: 'to',
    label: 'To',
    description: blockchainTooltipData.tokenTransfers.to
  },
  {
    cols: 2,
    key: 'amount',
    label: 'Amount',
    description: blockchainTooltipData.tokenTransfers.amount
  },
  {
    cols: 3,
    key: 'token',
    label: 'Token',
  },
  {
    cols: 5,
    key: 'date',
    label: 'Date',
  },
  {
    cols: 1,
    center: true,
    key: 'icon',
    label: '',
  },
]

export const tokenDetailTransferTableColumns = [
  {
    cols: 5,
    key: 'requestKey',
    label: 'Request Key',
    description: blockchainTooltipData.tokenDetails.transfers.hash
  },
  {
    center: true,
    cols: 2,
    key: 'method',
    label: 'Method',
    description: blockchainTooltipData.tokenDetails.transfers.method
  },
  {
    cols: 4,
    key: 'from',
    label: 'From',
    description: blockchainTooltipData.tokenDetails.transfers.from
  },
  {
    cols: 4,
    key: 'to',
    label: 'To',
    description: blockchainTooltipData.tokenDetails.transfers.to
  },
  {
    cols: 4,
    key: 'amount',
    label: 'Amount',
  },
  {
    cols: 5,
    key: 'date',
    label: 'Date',
  },
]

export const holdersTableColumns = [
  {
    cols: 1,
    key: 'ranking',
    label: '#'
  },
  {
    cols: 7,
    key: 'address',
    label: 'Address',
  },
  {
    cols: 5,
    key: 'quantity',
    label: 'Quantity',
  },
  {
    cols: 5,
    key: 'value',
    label: 'Value',
    description: blockchainTooltipData.tokenDetails.holders.valueUSD
  },
  {
    cols: 6,
    key: 'percentage',
    label: 'Percentage',
    description: blockchainTooltipData.tokenDetails.holders.percentage
  },
]

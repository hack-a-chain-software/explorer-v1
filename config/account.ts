import { blockchainTooltipData } from "./tooltips"

export const assetsTableColumns = [
  {
    cols: 5,
    key: 'asset',
    label: 'Asset',
    description: blockchainTooltipData.account.tabAssets.asset
  },
  {
    cols: 5,
    key: 'module',
    label: 'Module',
    description: blockchainTooltipData.account.tabAssets.symbol
  },
  {
    cols: 4,
    key: 'balance',
    label: 'Quantity',
    description: blockchainTooltipData.account.tabAssets.quantity
  },
  {
    cols: 4,
    key: 'price',
    label: 'Price',
    description: blockchainTooltipData.account.tabAssets.price
  },
  {
    cols: 4,
    key: 'value',
    label: 'Value',
    description: blockchainTooltipData.account.tabAssets.value
  },
  {
    cols: 2,
    center: true,
    key: 'distribution',
    label: 'Distribution',
  },
]

export const assetsTableSubColumns = [
  {
    key: 'chainId',
    label: 'Chain',
  },
  {
    key: 'balance',
    label: 'Quantity',
  },
  {
    key: 'value',
    label: 'Value',
  },
]

export const statementTableColumns = [
  {
    cols: 6,
    key: 'createdAt',
    label: 'Date',
    description: blockchainTooltipData.account.tabAccountStatement.date
  },
  {
    cols: 6,
    key: 'description',
    label: 'Transaction description',
    description: blockchainTooltipData.account.tabAccountStatement.transactionDescription
  },
  {
    cols: 6,
    key: 'amount',
    label: 'Amount',
    description: blockchainTooltipData.account.tabAccountStatement.amount
  },
  {
    cols: 6,
    key: 'balance',
    label: 'Running Balance',
    description: blockchainTooltipData.account.tabAccountStatement.runningBalance
  },
]


export const accountTransactionsTableColumns = [
  {
    cols: 2,
    key: 'status',
    label: 'Status',
    description: blockchainTooltipData.transaction.status
  },
  {
    cols: 6,
    key: 'requestKey',
    label: 'Request Key',
    description: blockchainTooltipData.transaction.requestKey
  },
  {
    cols: 3,
    key: 'sender',
    label: 'Sender',
    description: blockchainTooltipData.transaction.overview.from
  },
  {
    cols: 2,
    key: 'gas',
    label: 'Gas',
    center: true,
  },
  {
    cols: 2,
    center: true,
    key: 'chainId',
    label: 'Chain',
    description: blockchainTooltipData.transaction.chain
  },
  {
    cols: 3,
    center: true,
    key: 'block',
    label: 'Block Height',
    description: blockchainTooltipData.transaction.blockHeight
  },
  {
    cols: 5,
    key: 'createdAt',
    label: 'Date',
    description: blockchainTooltipData.transaction.meta.creationTime
  },
  {
    isFixed: true,
    cols: 1,
    key: 'icon',
    label: '',
  },
]

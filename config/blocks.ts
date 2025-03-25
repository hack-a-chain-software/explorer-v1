import { blockchainTooltipData } from "./tooltips"

export const blocksTableColumns = [
  {
    cols: 3,
    key: 'height',
    label: 'Block Height',
    description: blockchainTooltipData.block.blockHeight
  },
  {
    cols: 5,
    key: 'hash',
    label: 'Hash',
    description: blockchainTooltipData.block.overview.hash
  },
  {
    cols: 3,
    key: 'miner',
    label: 'Miner',
  },
  {
    cols: 2,
    center: true,
    key: 'transactionsCount',
    label: 'Transactions',
  },
  {
    cols: 2,
    center: true,
    key: 'chainId',
    label: 'Chain',
    description: blockchainTooltipData.block.chain
  },
  {
    cols: 3,
    key: 'fees',
    center: true,
    label: 'Total Fees (KDA)',
    description: blockchainTooltipData.block.overview.totalFees
  },
  {
    cols: 5,
    key: 'createdAt',
    label: 'Date',
    description: blockchainTooltipData.block.creationTime
  },
  {
    isFixed: true,
    cols: 1,
    key: 'icon',
    label: '',
  },
]

export const blockTransactionsTableColumns = [
  {
    cols: 2,
    key: 'status',
    label: 'Status',
    description: blockchainTooltipData.block.transactions.status
  },
  {
    cols: 8,
    key: 'requestkey',
    label: 'Request Key',
    description: blockchainTooltipData.block.transactions.requestKey
  },
  {
    cols: 14,
    key: 'code',
    label: 'Code',
    description: blockchainTooltipData.block.transactions.code
  },
]

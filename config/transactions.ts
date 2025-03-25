import { blockchainTooltipData } from "./tooltips"

export const transactionTableColumns = [
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
    withChainFilter: true,
    // description: blockchainTooltipData.transaction.chain
  },
  {
    cols: 3,
    center: true,
    key: 'block',
    label: 'Block Height',
    description: blockchainTooltipData.transaction.blockHeight
  },
  // {
  //   cols: 4,
  //   key: 'receiver',
  //   label: 'To',
  //   description: blockchainTooltipData.transaction.overview.to
  // },
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

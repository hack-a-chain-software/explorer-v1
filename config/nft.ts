import { blockchainTooltipData } from "./tooltips"

export const nftCollectionsTableColumns = [
  {
    cols: 1,
    center: true,
    key: 'position',
    label: '#'
  },
  {
    cols: 5,
    key: 'collection',
    label: 'Collection',
  },
  {
    cols: 3,
    key: 'volume',
    label: 'Volume',
    description: blockchainTooltipData.trendingCollections.volume
  },
  {
    cols: 3,
    key: 'delta',
    label: 'Volume Change',
    description: blockchainTooltipData.trendingCollections.volumeChange
  },
  {
    cols: 2,
    key: 'floorPrice',
    label: 'Floor Price',
    description: blockchainTooltipData.trendingCollections.floorPrice
  },
  {
    cols: 3,
    key: 'owners',
    label: 'Owners',
    description: blockchainTooltipData.trendingCollections.owners
  },
  {
    cols: 3,
    key: 'transfers',
    label: 'Transfers',
    description: blockchainTooltipData.trendingCollections.transfers
  },
  {
    cols: 3,
    key: 'assets',
    label: 'Total Assets',
    description: blockchainTooltipData.trendingCollections.totalAssets
  },
  {
    cols: 1,
    center: true,
    key: 'icon',
    label: '',
  },
]

export const nftTransfersTableColumns = [
  {
    cols: 4,
    key: 'hash',
    label: 'Hash',
    description: blockchainTooltipData.nft.transfers.hash
  },
  {
    center: true,
    cols: 2,
    key: 'method',
    label: 'Method',
    description: blockchainTooltipData.nft.transfers.method
  },
  {
    cols: 4,
    key: 'from',
    label: 'From',
    description: blockchainTooltipData.nft.transfers.from
  },
  {
    cols: 4,
    key: 'to',
    label: 'To',
    description: blockchainTooltipData.nft.transfers.to
  },
  {
    cols: 5,
    key: 'date',
    label: 'Date',
  },
  {
    cols: 4,
    key: 'item',
    label: 'Item',
  },
  {
    cols: 1,
    center: true,
    key: 'icon',
    label: '',
  },
]

export const nftActivityTableColumns = [
  {
    cols: 2,
    key: 'activity',
    label: 'Activity'
  },
  {
    cols: 2,
    key: 'amount',
    label: 'Price',
  },
  {
    cols: 6,
    key: 'hash',
    label: 'Hash',
    description: blockchainTooltipData.nftDetails.activity.hash
  },
  {
    cols: 4,
    key: 'from',
    label: 'From',
    description: blockchainTooltipData.nftDetails.activity.from
  },
  {
    cols: 4,
    key: 'to',
    label: 'To',
    description: blockchainTooltipData.nftDetails.activity.to
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

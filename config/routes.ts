export type RouteType = 'link' | 'group';

export interface BaseRoute {
  path?: string;
  tag: string;
  label: string;
  disabled?: boolean
}

export interface LinkRoute extends BaseRoute{
  type: 'link';
}

export interface GroupRoute {
  type: 'group';
  tag: string;
  label: string;
  subroutes?: BaseRoute[];
}

export type Route = LinkRoute | GroupRoute;

export const routes: Route[] = [
  {
    type: 'link',
    path: '/blocks',
    label: 'Blocks',
    tag: 'route:blockchains',
  },
  {
    type: 'link',
    path: '/transactions',
    label: 'Transactions',
    tag: 'route:transactions',
  },
  {
    type: 'link',
    path: '/nfts',
    label: 'NFTs',
    tag: 'route:transactions',
  },
  {
    path: '/tokens',
    type: 'group',
    label: 'Tokens',
    tag: 'route:token',
    subroutes: [
      // {
      //   path: '/tokens',
      //   label: 'Token Transfers',
      //   tag: 'route:token',
      // },
      {
        path: '/tokens/trending',
        label: 'Trending tokens',
        tag: 'route:tokens:trending',
      },
    ]
  },
  // {
  //   label: 'NFT',
  //   type: 'group',
  //   tag: 'route:nft',
  //   subroutes: [
  //     // {
  //     //   disabled: true,
  //     //   path: '/collections',
  //     //   tag: 'route:collections',
  //     //   label: 'NFT Trending Collections',
  //     // },
  //     {
  //       path: '/nfts',
  //       label: 'NFT Transfers',
  //       tag: 'route:collections:nfts',
  //     }
  //   ]
  // }
]

export default routes

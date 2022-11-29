/**
 * Constant with the auction settings.
 */
export const BIN_CHANNEL = "884789357653934131";
export const AUCTION_CHANNEL = "884789397659217970";

/**
 * @type a single auction.
 */
export type TypeAuction = {
  uuid: string;
  auctioneer: string;
  profile_id: string;
  start: number;
  end: number;
  stripped_item_name?: string;
  item_name: string;
  category: string;
  tier: string;
  starting_bid: number;
  claimed: boolean;
  highest_bid_amount: number;
  bin: boolean;
  lowest_bin: number;
  updated_at: number;
  estimated_profit: number;
  scanned_auctions: number;
  stars: number;
};

/**
 * @type a sorted auction list based on tier.
 */
export type TypeSortedTierAuction = {
  name: string;
  tier: string;
  auctions: TypeAuction[];
};

/**
 * @type a sorted auction list.
 */
export type TypeSortedAuction = {
  name: string;
  auctions: TypeAuction[];
};

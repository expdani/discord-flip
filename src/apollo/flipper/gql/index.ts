import { gql } from "@apollo/client/core";

export const GET_ACTIVE_BINS = gql`
  query GetActiveBins($amount: Int) {
    getActiveBins(amount: $amount) {
      uuid
      auctioneer
      profile_id
      item_name
      stripped_item_name
      category
      tier
      lowest_bin
      starting_bid
      claimed
      highest_bid_amount
      estimated_profit
      scanned_auctions
      stars
      level
      created_at
      start
      end
      updated_at
    }
  }
`;

export const GET_ACTIVE_AUCTIONS = gql`
  query GetActiveAuctions($amount: Int) {
    getActiveAuctions(amount: $amount) {
      uuid
      auctioneer
      profile_id
      item_name
      stripped_item_name
      category
      tier
      lowest_bin
      starting_bid
      claimed
      highest_bid_amount
      estimated_profit
      scanned_auctions
      stars
      level
      created_at
      start
      end
      updated_at
    }
  }
`;

import { apolloClient } from "../index";
import { TypeAuction } from "../../controllers/flipper/types";
import { GET_ACTIVE_AUCTIONS, GET_ACTIVE_BINS } from "./gql";

/**
 * Get user karma
 */
export async function getActiveBins(amount?: number): Promise<TypeAuction[]> {
  const { data } = await apolloClient.query({
    query: GET_ACTIVE_BINS,
    variables: {
      amount,
    },
  });

  return data.getActiveBins;
}

/**
 * Get user karma
 */
export async function getActiveAuctions(
  amount?: number
): Promise<TypeAuction[]> {
  const { data } = await apolloClient.query({
    query: GET_ACTIVE_AUCTIONS,
    variables: {
      amount,
    },
  });

  return data.getActiveAuctions;
}

/**
 * Motorcart API client — replaces Supabase SDK.
 * Same import patterns: auth, from(), storage, channel(), rpc()
 */
import { apiAuth } from "./auth";
import { fromTable, rpc } from "./query-builder";
import { apiStorage } from "./storage";
import { createChannel, removeChannel } from "./realtime";

export const motorcartApi = {
  auth: apiAuth,
  from: fromTable,
  storage: apiStorage,
  channel: createChannel,
  removeChannel,
  rpc,
};

/** @deprecated Use motorcartApi — kept so existing imports keep working */
export const supabase = motorcartApi;

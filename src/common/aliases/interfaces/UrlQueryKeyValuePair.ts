import { URL_QUERY_PARAM_KEYS } from "../../constants/URL_QUERY_PARAM_KEYS";
import { OrUndefined } from "../types/OrUndefined";

export interface UrlQueryKeyValuePair {
    key: typeof URL_QUERY_PARAM_KEYS[keyof typeof URL_QUERY_PARAM_KEYS];
    value: OrUndefined<string | number>;
}
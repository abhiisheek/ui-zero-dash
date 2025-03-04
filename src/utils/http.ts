import cloneDeep from "lodash.clonedeep";
import axios from "axios";

interface CacheItemType {
  data: any;
  expire?: number;
}

interface HeaderType {
  [key: string]: string;
}

interface HTTPMethodsType {
  [key: string]: string;
}

interface CacheType {
  [key: string]: CacheItemType;
}

interface NeedsPayloadType {
  [key: string]: boolean;
}

interface HTTPRequestParamsType {
  url: string;
  method?: string;
  reqParams?: any;
  reqHeaders?: HeaderType;
  cacheResponse?: boolean;
  cacheExpireDuration?: number;
  setAuthInHeader?: boolean;
}

const NEEDS_PAYLOAD: NeedsPayloadType = {
  POST: true,
  PUT: true,
  PATCH: true,
  DELETE: true,
};

const HTTP_METHODS: HTTPMethodsType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export class RequestHelper {
  static cache: CacheType = {};

  static getFromCache(key: string) {
    const item = RequestHelper.cache[key];
    if (item) {
      if (item.expire && item.expire < Date.now()) {
        delete RequestHelper.cache[key];
      } else {
        return item.data;
      }
    }
    return null;
  }

  static insertToCache(obj: CacheItemType, key: string, expireDuration: number) {
    obj.expire = Date.now() + expireDuration;

    RequestHelper.cache[key] = obj;
  }

  static async makeRequest({
    url,
    method = HTTP_METHODS.GET,
    reqParams = {},
    reqHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cacheResponse = false,
    cacheExpireDuration = 5 * 60000,
    setAuthInHeader = true,
  }: HTTPRequestParamsType) {
    try {
      const cacheKey = `${url}-${JSON.stringify(reqParams)}`;

      const cachedData = RequestHelper.getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const headers = cloneDeep(reqHeaders);

      if (setAuthInHeader) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      }

      const response = await axios({
        method,
        url,
        headers,
        data: NEEDS_PAYLOAD[method] ? JSON.stringify(reqParams) : null,
      });

      const data = response.data;

      if (cacheResponse) {
        RequestHelper.insertToCache({ data }, cacheKey, cacheExpireDuration);
      }

      return data;
    } catch (error) {
      console.error("Error in makeRequest", error);
      throw error;
    }
  }
}

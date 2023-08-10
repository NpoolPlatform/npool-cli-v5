/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Couponallocatedv1Coupon {
  ID?: string;
  CouponType?: V1CouponType;
  AppID?: string;
  UserID?: string;
  Value?: string;
  Circulation?: string;
  /** @format int64 */
  StartAt?: number;
  /** @format int64 */
  DurationDays?: number;
  /** @format int64 */
  EndAt?: number;
  CouponID?: string;
  CouponName?: string;
  Message?: string;
  Expired?: boolean;
  Valid?: boolean;
  Used?: boolean;
  /** @format int64 */
  UsedAt?: number;
  UsedByOrderID?: string;
  GoodID?: string;
  Threshold?: string;
  /** @format int64 */
  CreatedAt?: number;
  /** @format int64 */
  UpdatedAt?: number;
}

export interface Inspiregatewaycouponallocatedv1CreateCouponRequest {
  AppID?: string;
  TargetUserID?: string;
  CouponType?: V1CouponType;
  CouponID?: string;
}

export interface Inspiregatewaycouponallocatedv1CreateCouponResponse {
  Info?: Couponallocatedv1Coupon;
}

export interface Inspiregatewaycouponallocatedv1GetCouponsRequest {
  AppID?: string;
  UserID?: string;
  /** @format int32 */
  Offset?: number;
  /** @format int32 */
  Limit?: number;
}

export interface Inspiregatewaycouponallocatedv1GetCouponsResponse {
  Infos?: Couponallocatedv1Coupon[];
  /** @format int64 */
  Total?: number;
}

export interface ProtobufAny {
  "@type"?: string;
  [key: string]: any;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/** @default "DefaultCouponType" */
export enum V1CouponType {
  DefaultCouponType = "DefaultCouponType",
  FixAmount = "FixAmount",
  Discount = "Discount",
  SpecialOffer = "SpecialOffer",
  ThresholdFixAmount = "ThresholdFixAmount",
  ThresholdDiscount = "ThresholdDiscount",
  GoodFixAmount = "GoodFixAmount",
  GoodDiscount = "GoodDiscount",
  GoodThresholdFixAmount = "GoodThresholdFixAmount",
  GoodThresholdDiscount = "GoodThresholdDiscount",
}

export interface V1GetAppCouponsRequest {
  AppID?: string;
  /** @format int32 */
  Offset?: number;
  /** @format int32 */
  Limit?: number;
}

export interface V1GetAppCouponsResponse {
  Infos?: Couponallocatedv1Coupon[];
  /** @format int64 */
  Total?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title npool/inspire/gw/v1/coupon/allocated/allocated.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Gateway
     * @name GatewayCreateCoupon
     * @request POST:/v1/create/allocatedcoupon
     */
    gatewayCreateCoupon: (body: Inspiregatewaycouponallocatedv1CreateCouponRequest, params: RequestParams = {}) =>
      this.request<Inspiregatewaycouponallocatedv1CreateCouponResponse, RpcStatus>({
        path: `/v1/create/allocatedcoupon`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gateway
     * @name GatewayGetCoupons
     * @request POST:/v1/get/allocatedcoupons
     */
    gatewayGetCoupons: (body: Inspiregatewaycouponallocatedv1GetCouponsRequest, params: RequestParams = {}) =>
      this.request<Inspiregatewaycouponallocatedv1GetCouponsResponse, RpcStatus>({
        path: `/v1/get/allocatedcoupons`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gateway
     * @name GatewayGetAppCoupons
     * @request POST:/v1/get/app/allocatedcoupons
     */
    gatewayGetAppCoupons: (body: V1GetAppCouponsRequest, params: RequestParams = {}) =>
      this.request<V1GetAppCouponsResponse, RpcStatus>({
        path: `/v1/get/app/allocatedcoupons`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

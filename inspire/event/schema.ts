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

export interface Inspiregatewayeventv1Coupon {
  ID?: string;
  CouponType?: V1CouponType;
  Value?: string;
  Name?: string;
}

export interface Inspiregatewayeventv1CreateEventRequest {
  AppID?: string;
  EventType?: V1UsedFor;
  Coupons?: Inspiremanagereventv1Coupon[];
  Credits?: string;
  CreditsPerUSD?: string;
  /** @format int64 */
  MaxConsecutive?: number;
  GoodID?: string;
  /** @format int64 */
  InviterLayers?: number;
}

export interface Inspiregatewayeventv1CreateEventResponse {
  Info?: Inspiregatewayeventv1Event;
}

export interface Inspiregatewayeventv1Event {
  ID?: string;
  AppID?: string;
  AppName?: string;
  EventType?: V1UsedFor;
  Coupons?: Inspiregatewayeventv1Coupon[];
  Credits?: string;
  CreditsPerUSD?: string;
  /** @format int64 */
  MaxConsecutive?: number;
  GoodID?: string;
  GoodName?: string;
  /** @format int64 */
  InviterLayers?: number;
  /** @format int64 */
  CreatedAt?: number;
  /** @format int64 */
  UpdatedAt?: number;
  /** @format int64 */
  DeletedAt?: number;
}

export interface Inspiregatewayeventv1GetEventsRequest {
  AppID?: string;
  /** @format int32 */
  Offset?: number;
  /** @format int32 */
  Limit?: number;
}

export interface Inspiregatewayeventv1GetEventsResponse {
  Infos?: Inspiregatewayeventv1Event[];
  /** @format int64 */
  Total?: number;
}

export interface Inspiregatewayeventv1UpdateEventRequest {
  ID?: string;
  AppID?: string;
  Coupons?: Inspiremanagereventv1Coupon[];
  Credits?: string;
  CreditsPerUSD?: string;
  /** @format int64 */
  MaxConsecutive?: number;
  /** @format int64 */
  InviterLayers?: number;
}

export interface Inspiregatewayeventv1UpdateEventResponse {
  Info?: Inspiregatewayeventv1Event;
}

export interface Inspiremanagereventv1Coupon {
  ID?: string;
  CouponType?: V1CouponType;
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

/** @default "DefaultUsedFor" */
export enum V1UsedFor {
  DefaultUsedFor = "DefaultUsedFor",
  Signup = "Signup",
  Signin = "Signin",
  Update = "Update",
  Contact = "Contact",
  SetWithdrawAddress = "SetWithdrawAddress",
  Withdraw = "Withdraw",
  CreateInvitationCode = "CreateInvitationCode",
  SetCommission = "SetCommission",
  SetTransferTargetUser = "SetTransferTargetUser",
  Transfer = "Transfer",
  WithdrawalRequest = "WithdrawalRequest",
  WithdrawalCompleted = "WithdrawalCompleted",
  DepositReceived = "DepositReceived",
  KYCApproved = "KYCApproved",
  KYCRejected = "KYCRejected",
  Purchase = "Purchase",
  AffiliatePurchase = "AffiliatePurchase",
  Announcement = "Announcement",
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
 * @title npool/inspire/gw/v1/event/event.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Gateway
     * @name GatewayCreateEvent
     * @request POST:/v1/create/eventinspire
     */
    gatewayCreateEvent: (body: Inspiregatewayeventv1CreateEventRequest, params: RequestParams = {}) =>
      this.request<Inspiregatewayeventv1CreateEventResponse, RpcStatus>({
        path: `/v1/create/eventinspire`,
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
     * @name GatewayGetEvents
     * @request POST:/v1/get/eventinspires
     */
    gatewayGetEvents: (body: Inspiregatewayeventv1GetEventsRequest, params: RequestParams = {}) =>
      this.request<Inspiregatewayeventv1GetEventsResponse, RpcStatus>({
        path: `/v1/get/eventinspires`,
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
     * @name GatewayUpdateEvent
     * @request POST:/v1/update/eventinspire
     */
    gatewayUpdateEvent: (body: Inspiregatewayeventv1UpdateEventRequest, params: RequestParams = {}) =>
      this.request<Inspiregatewayeventv1UpdateEventResponse, RpcStatus>({
        path: `/v1/update/eventinspire`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

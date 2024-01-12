import { BaseRequest } from '../../request'

export interface Media {
  ID: number
  EntID: string
  AppID: string
  Name: string
  Ext: string
  MediaURL: string
  MediaData: string
  CreatedBy: string
  CreatedAt: number
  UpdatedAt: number
}

export interface MediaReq {
  EntID: string
  Name: string
  MediaData: string
}

export interface UploadMediaRequest extends BaseRequest{
  Name: string
  MediaData: string
}

export interface UploadMediaResponse {
  Info: Media
}

export interface GetMediasRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetMediasResponse {
  Infos: Media[]
  Total: number
}

export interface DeleteMediaRequest extends BaseRequest{
  ID: number
  EntID: string
}

export interface DeleteMediaResponse {
  Info: Media
}

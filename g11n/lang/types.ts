import { BaseRequest } from '../../request'

export interface Lang {
  ID: number
  EntID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
  CreatedAt: number
  UpdatedAt: number
}

export interface LangReq {
  EntID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

export interface CreateLangRequest extends BaseRequest{
  Lang: string
  Logo: string
  Name: string
  Short: string
}

export interface CreateLangResponse {
  Info: Lang
}

export interface CreateLangsRequest extends BaseRequest{
  Infos: LangReq[]
}

export interface CreateLangsResponse {
  Infos: Lang[]
}

export interface GetLangsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetLangsResponse {
  Infos: Lang[]
  Total: number
}

export interface UpdateLangRequest extends BaseRequest{
  ID: number
  Lang: string
  Logo: string
  Name: string
  Short: string
}

export interface UpdateLangResponse {
  Info: Lang
}

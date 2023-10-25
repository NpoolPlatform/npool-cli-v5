export interface AppLang {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  LangID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
  Main: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface Message {
  ID: number
  EntID: string
  AppID: string
  AppName: string
  LangID: string
  Lang: string
  MessageID: string
  Message: string
  GetIndex: number
  Disabled: boolean
  CreatedAt: number
  UpdatedAt: number
}

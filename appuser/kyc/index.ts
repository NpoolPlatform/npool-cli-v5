import { doAction, doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API, ImageType } from './const'
import {
  CreateKYCRequest,
  CreateKYCResponse,
  GetKYCImageRequest,
  GetKYCImageResponse,
  GetKYCRequest,
  GetKYCResponse,
  KYCImage,
  KYC,
  UpdateKYCRequest,
  UpdateKYCResponse,
  UploadKYCImageRequest,
  UploadKYCImageResponse,
  GetUserKYCImageRequest,
  GetUserKYCImageResponse,
  GetAppUserKYCImageRequest,
  GetAppUserKYCImageResponse
} from './types'
import { formalizeAppID } from '../app/local'
import { formalizeUserID } from '../user'

export const useKYCStore = defineStore('kycs', {
  state: () => ({
    Images: new Map<string, Map<string, Map<ImageType, KYCImage>>>(),
    KYCs: new Map<string, Array<KYC>>()
  }),
  getters: {
    kyc (): (appID: string | undefined, userID: string) => KYC | undefined {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.KYCs.get(appID)?.find((el) => el.UserID === userID)
      }
    },
    kycs (): (appID?: string) => Array<KYC> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.KYCs.get(appID) || []
      }
    },
    images (): (appID?: string, userID?: string) => Map<ImageType, KYCImage> {
      return (appID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Images.get(appID)?.get(userID) || new Map<ImageType, KYCImage>()
      }
    },
    image (): (appID: string | undefined, userID: string | undefined, imageType: ImageType) => KYCImage | undefined {
      return (appID: string | undefined, userID: string | undefined, imageType: ImageType) => {
        appID = formalizeAppID(appID)
        userID = formalizeUserID(userID)
        return this.Images.get(appID)?.get(userID)?.get(imageType)
      }
    }
  },
  actions: {
    addKYCs (appID: string | undefined, kycs: Array<KYC>) {
      appID = formalizeAppID(appID)
      let _kycs = this.KYCs.get(appID) as Array<KYC>
      if (!_kycs) {
        _kycs = []
      }
      kycs.forEach((kyc) => {
        const index = _kycs.findIndex((el) => el.ID === kyc.ID)
        _kycs.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, kyc)
      })
      this.KYCs.set(appID, _kycs)
    },
    addImage (appID: string | undefined, userID: string | undefined, image: KYCImage) {
      appID = formalizeAppID(appID)
      userID = formalizeUserID(userID)
      let appImages = this.Images.get(appID) as Map<string, Map<ImageType, KYCImage>>
      if (!appImages) {
        appImages = new Map<string, Map<ImageType, KYCImage>>()
      }
      let userImages = appImages.get(userID) as Map<ImageType, KYCImage>
      if (!userImages) {
        userImages = new Map<ImageType, KYCImage>()
      }
      userImages.set(image.Type, image)
      appImages.set(userID, userImages)
      this.Images.set(appID, appImages)
    },
    uploadImage (req: UploadKYCImageRequest, done: (error: boolean) => void) {
      doActionWithError<UploadKYCImageRequest, UploadKYCImageResponse>(
        API.UPLOAD_KYC_IMAGE,
        req,
        req.Message,
        (resp: UploadKYCImageResponse): void => {
          this.addImage(undefined, undefined, {
            Type: req.ImageType,
            URI: resp.Info,
            Base64: req.ImageBase64
          })
          done(false)
        }, () => {
          done(true)
        })
    },
    createKYC (req: CreateKYCRequest, done: (error: boolean) => void) {
      doActionWithError<CreateKYCRequest, CreateKYCResponse>(
        API.CREATE_KYC,
        req,
        req.Message,
        (resp: CreateKYCResponse): void => {
          this.addKYCs(undefined, [resp.Info])
          done(false)
        }, () => {
          done(true)
        })
    },
    updateKYC (req: UpdateKYCRequest, done?: (error: boolean) => void) {
      doActionWithError<UpdateKYCRequest, UpdateKYCResponse>(
        API.UPDATE_KYC,
        req,
        req.Message,
        (resp: UpdateKYCResponse): void => {
          this.addKYCs(undefined, [resp.Info])
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getKYC (req: GetKYCRequest, done: (error: boolean) => void) {
      doActionWithError<GetKYCRequest, GetKYCResponse>(
        API.GET_KYC,
        req,
        req.Message,
        (resp: GetKYCResponse): void => {
          this.addKYCs(undefined, [resp.Info])
          done(false)
        }, () => {
          done(true)
        })
    },
    getKYCImage (req: GetKYCImageRequest, done: () => void) {
      doAction<GetKYCImageRequest, GetKYCImageResponse>(
        API.GET_KYC_IMAGE,
        req,
        req.Message,
        (resp: GetKYCImageResponse): void => {
          this.addImage(undefined, undefined, {
            Type: req.ImageType,
            URI: '',
            Base64: resp.Info
          })
          done()
        })
    },
    getUserKYCImage (req: GetUserKYCImageRequest, done: () => void) {
      doAction<GetUserKYCImageRequest, GetUserKYCImageResponse>(
        API.GET_USER_KYCIMAGE,
        req,
        req.Message,
        (resp: GetUserKYCImageResponse): void => {
          this.addImage(undefined, req.TargetUserID, {
            Type: req.ImageType,
            URI: '',
            Base64: resp.Info
          })
          done()
        })
    },
    getAppUserKYCImage (req: GetAppUserKYCImageRequest, kycID: string, done: () => void) {
      doAction<GetAppUserKYCImageRequest, GetAppUserKYCImageResponse>(
        API.GET_APP_USER_KYCIMAGE,
        req,
        req.Message,
        (resp: GetAppUserKYCImageResponse): void => {
          this.addImage(req.TargetUserID, req.TargetUserID, {
            Type: req.ImageType,
            URI: '',
            Base64: resp.Info
          })
          done()
        })
    }
  }
})

export * from './types'
export * from './const'

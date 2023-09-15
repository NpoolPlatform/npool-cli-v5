import { defineStore } from 'pinia'
import { API } from './const'
import {
  TNotifChannel,
  GetAppNotifChannelsRequest,
  GetAppNotifChannelsResponse,
  CreateNotifChannelRequest,
  CreateNotifChannelResponse,
  DeleteNotifChannelRequest,
  DeleteNotifChannelResponse,
  GetNAppNotifChannelsRequest,
  GetNAppNotifChannelsResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useAdminNotifChannelStore = defineStore('notif-channels', {
  state: () => ({
    NotifChannels: new Map<string, Array<TNotifChannel>>()
  }),
  getters: {
    channel (): (appID: string | undefined, id: string) => TNotifChannel | undefined {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        return this.NotifChannels.get(appID)?.find((el) => el.ID === id)
      }
    },
    channels (): (appID: string | undefined) => Array<TNotifChannel> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.NotifChannels.get(appID)?.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0) || []
      }
    },
    addChannels (): (appID: string | undefined, channels: Array<TNotifChannel>) => void {
      return (appID: string | undefined, channels: Array<TNotifChannel>) => {
        appID = formalizeAppID(appID)
        let _channels = this.NotifChannels.get(appID) as Array<TNotifChannel>
        if (!_channels) {
          _channels = []
        }
        channels.forEach((channel) => {
          const index = _channels.findIndex((el) => el.ID === channel.ID)
          _channels.splice(index, 1, channel)
        })
        this.NotifChannels.set(appID, _channels)
      }
    },
    delChannel (): (appID: string | undefined, id: string) => void {
      return (appID: string | undefined, id: string) => {
        appID = formalizeAppID(appID)
        let _channels = this.NotifChannels.get(appID) as Array<TNotifChannel>
        if (!_channels) {
          _channels = []
        }
        const index = _channels.findIndex((el) => el.ID === id)
        _channels.splice(index, 1)
        this.NotifChannels.set(appID, _channels)
      }
    }
  },
  actions: {
    getAppNotifChannels (req: GetAppNotifChannelsRequest, done: (error: boolean, rows: Array<TNotifChannel>) => void) {
      doActionWithError<GetAppNotifChannelsRequest, GetAppNotifChannelsResponse>(
        API.GET_APP_NOTIFCHANNELS,
        req,
        req.Message,
        (resp: GetAppNotifChannelsResponse): void => {
          this.addChannels(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<TNotifChannel>)
        }
      )
    },
    deleteNotifChannel (req: DeleteNotifChannelRequest, done: (error: boolean, row: TNotifChannel) => void) {
      doActionWithError<DeleteNotifChannelRequest, DeleteNotifChannelResponse>(
        API.DELETE_NOTIFCHANNEL,
        req,
        req.Message,
        (resp: DeleteNotifChannelResponse): void => {
          this.delChannel(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as TNotifChannel)
        }
      )
    },
    createNotifChannel (req: CreateNotifChannelRequest, done: (error: boolean, row?: TNotifChannel) => void) {
      doActionWithError<CreateNotifChannelRequest, CreateNotifChannelResponse>(
        API.CREATE_NOTIFCHANNEL,
        req,
        req.Message,
        (resp: CreateNotifChannelResponse): void => {
          this.addChannels(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    },

    getNAppNotifChannels (req: GetNAppNotifChannelsRequest, done: (error: boolean, rows: Array<TNotifChannel>) => void) {
      doActionWithError<GetNAppNotifChannelsRequest, GetNAppNotifChannelsResponse>(
        API.GET_N_APP_NOTIFCHANNELS,
        req,
        req.Message,
        (resp: GetNAppNotifChannelsResponse): void => {
          this.addChannels(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<TNotifChannel>)
        }
      )
    }
  }
})

export enum API {
  CREATE_NOTIFCHANNEL = '/notif/v1/create/notifchannel',
  DELETE_NOTIFCHANNEL = '/notif/v1/delete/notifchannel',
  GET_APP_NOTIFCHANNELS = '/notif/v1/get/app/notifchannels',
  GET_N_APP_NOTIFCHANNELS = '/notif/v1/get/n/app/notifchannels',
}

export enum NotifChannel {
  ChannelEmail = 'ChannelEmail',
  ChannelSMS = 'ChannelSMS',
  ChannelFrontend = 'ChannelFrontend'
}

export const NotifChannels = Object.values(NotifChannel)

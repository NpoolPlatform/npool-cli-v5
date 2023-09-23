export enum NotifType {
  Broadcast = 'NotifBroadcast',
  Multicast = 'NotifMulticast',
  Unicast = 'NotifUnicast'
}

export const NotifTypes = Object.values(NotifType)

export enum NotifChannel {
  ChannelEmail = 'ChannelEmail',
  ChannelSMS = 'ChannelSMS',
  ChannelFrontend = 'ChannelFrontend'
}

export const NotifChannels = Object.values(NotifChannel)

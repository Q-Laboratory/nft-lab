import { ICON_NAMES } from '@/enums'

export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: typeof ICON_NAMES | unknown
}

export type NftItem = {
  link: string
  title: string
  owner: string
}

export type NftDetails = {
  owner: string
  id: string
  address: string
  link: string
  name: string
}

import { detect } from 'detect-browser'

export enum MOBILE_OS {
  ios = 'iOS',
  android = 'Android OS',
}

export function isIos() {
  const res = detect()
  return res?.os === MOBILE_OS.ios
}

export function isAndroid() {
  const res = detect()
  return res?.os === MOBILE_OS.android
}

export function isMobileCheck() {
  return isAndroid() || isIos()
}

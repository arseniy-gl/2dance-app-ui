// @flow

const validId: EventsViewId[] = ['main', 'bay-pass', 'second-user' , 'pay', 'ym-success', 'edit'];

export function extractEventViewId(src?: string): EventsViewId {
  return validId.find(row => row === src) || 'main'
}
import { RootState } from '../index'
import { IAlertStack } from 'store/alert/alert.slice'

export const getAlerts = (state: RootState): IAlertStack[] => {
  return state.alert.alertSt
}

export const isLoading = (state: RootState): boolean => {
  return state.alert.isLoading
}

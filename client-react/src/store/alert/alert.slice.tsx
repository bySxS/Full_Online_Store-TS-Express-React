import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// const LS_ALERT_KEY = 'rak'

export interface IAlertStack {
  id?: number
  title?: string
  message: string
  time?: string
  delay?: number
  color?: string
  status?: string
}

interface IAlertState {
  alertSt: IAlertStack[]
  isLoading: boolean
}

const initialState: IAlertState = {
  alertSt: [], // JSON.parse(localStorage.getItem(LS_ALERT_KEY) ?? '[]'),
  isLoading: false
}

export const AlertSlice = createSlice({
  name: 'alertStack',
  initialState,
  reducers: {
    setLoading (state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    addToAlertStack (state, action: PayloadAction<IAlertStack>) {
      const ids = new Set(state.alertSt.map(alert => alert.message))
      if (!ids.has(action.payload.message)) {
        if (!action.payload.status) {
          action.payload.status = 'success'
        }
        action.payload.id = state.alertSt.length + Math.floor(Math.random() * 10000)
        if (action.payload.status.toLowerCase() === 'success') {
          action.payload.color = 'success'
          action.payload.title = 'Успех'
          action.payload.delay = 2000
        } else if (action.payload.status.toLowerCase() === 'error') {
          action.payload.color = 'danger'
          action.payload.title = 'Ошибка'
          action.payload.delay = 5000
        } else if (action.payload.status.toLowerCase() === 'warning') {
          action.payload.color = 'warning'
          action.payload.title = 'Предупреждение'
          action.payload.delay = 3500
        }
        if (action.payload.time === '') {
          action.payload.time = new Date(Date.now()).toString()
        }
        state.alertSt = [...state.alertSt, action.payload]
        // localStorage.setItem(LS_ALERT_KEY, JSON.stringify(state.alertSt))
      }
    },
    delFromAlertStack (state, action: PayloadAction<number>) {
      state.alertSt = state.alertSt.filter(a => a.id !== action.payload)
      // localStorage.setItem(LS_ALERT_KEY, JSON.stringify(state.alertSt))
    }
  }
})

export const { addToAlertStack, delFromAlertStack, setLoading } = AlertSlice.actions
export const alertAction = AlertSlice.actions
export const alertReducer = AlertSlice.reducer

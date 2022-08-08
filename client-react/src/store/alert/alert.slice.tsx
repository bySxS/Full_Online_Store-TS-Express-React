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
      const alert = action.payload
      if (!ids.has(alert.message)) {
        if (!alert.status) {
          alert.status = 'success'
        }
        alert.id =
            state.alertSt.length +
            Math.floor(Math.random() * 10000)
        if (alert.status.toLowerCase() === 'success') {
          alert.color = 'success'
          alert.title = 'Успех'
          alert.delay = 2000
        } else if (alert.status.toLowerCase() === 'error') {
          alert.color = 'danger'
          alert.title = 'Ошибка'
          alert.delay = 5000
        } else if (alert.status.toLowerCase() === 'warning') {
          alert.color = 'warning'
          alert.title = 'Предупреждение'
          alert.delay = 3500
        }
        if (!alert.time) {
          alert.time = new Date().toISOString()
            .slice(0, 19).replace('T', ' ')
        }
        state.alertSt = [...state.alertSt, alert]
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

import { Numeric } from '@anfu/utils'
import type { ComponentPublicInstance } from 'vue'

export type ToastType = 'text' | 'loading' | 'mask'

export type ToastPosition = 'top' | 'middle' | 'bottom'

export const IS_ONCE = Symbol('once')

export type ToastOptions = {
  type?: ToastType
  message?: string
  duration?: number
  position?: ToastPosition
  forbidClick?: boolean
  icon?: string
}

export type ToastWrapperInstance = ComponentPublicInstance<
  { message: Numeric },
  {
    close: () => void
    // eslint-disable-next-line
    open: (props: Record<string, any>) => void
    id: string
    ['IS_ONCE']: boolean
  }
>

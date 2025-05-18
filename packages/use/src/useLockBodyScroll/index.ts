let globalLockCount = 0
let originalStyle = ''

export function useLockBodyScroll() {
  if (globalLockCount === 0) {
    originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
  }

  globalLockCount++

  return () => {
    globalLockCount--
    if (globalLockCount === 0) {
      document.body.style.overflow = originalStyle
      originalStyle = ''
    }
  }
}

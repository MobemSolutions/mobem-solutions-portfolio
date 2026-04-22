'use client'

export function useSuccessSound() {
  return function playSuccess() {
    if (typeof window === 'undefined') return
    try {
      const audio = new Audio('/ressources/sounds/mixkit-bubble-pop-up-alert-notification-2357.wav')
      audio.volume = 0.6
      audio.play().catch(() => {})
    } catch {
      // Audio non disponible — silent fail
    }
  }
}

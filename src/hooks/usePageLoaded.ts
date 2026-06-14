import { useEffect, useState } from 'react'

/**
 * Returns `false` until the page (and its initial assets) have finished
 * loading, then flips to `true`.
 *
 * A `minDuration` floor guarantees the preloader stays visible long enough
 * for its intro animation to read as intentional — preventing an ugly flash
 * on fast connections or warm caches.
 *
 * @param minDuration Minimum time (ms) the loader should remain visible.
 */
export function usePageLoaded(minDuration = 2000): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const start = performance.now()

    const finish = () => {
      const elapsed   = performance.now() - start
      const remaining = Math.max(0, minDuration - elapsed)
      const timer = window.setTimeout(() => setLoaded(true), remaining)
      return () => window.clearTimeout(timer)
    }

    // `load` may have already fired before this effect mounts.
    if (document.readyState === 'complete') {
      return finish()
    }

    window.addEventListener('load', finish, { once: true })
    return () => window.removeEventListener('load', finish)
  }, [minDuration])

  return loaded
}

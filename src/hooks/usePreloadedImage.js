import { useEffect, useState } from 'react'

function usePreloadedImage(src, fallbackSrc) {
  const [imageSrc, setImageSrc] = useState(fallbackSrc)

  useEffect(() => {
    let isCancelled = false
    const preloadImage = new Image()

    const markLoaded = () => {
      if (!isCancelled) {
        setImageSrc(src)
      }
    }

    const markFallback = () => {
      if (!isCancelled) {
        setImageSrc(fallbackSrc)
      }
    }

    preloadImage.onload = markLoaded
    preloadImage.onerror = markFallback
    preloadImage.src = src

    if (preloadImage.complete && preloadImage.naturalWidth > 0) {
      markLoaded()
    } else if (typeof preloadImage.decode === 'function') {
      preloadImage.decode().then(markLoaded).catch(() => {})
    }

    return () => {
      isCancelled = true
    }
  }, [src, fallbackSrc])

  return imageSrc
}

export default usePreloadedImage

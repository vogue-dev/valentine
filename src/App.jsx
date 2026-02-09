import { useEffect, useRef, useState } from 'react'
import './App.css'
import ActionButtons from './components/ActionButtons'
import CelebrationLayer from './components/CelebrationLayer'
import ImageGallery from './components/ImageGallery'
import PopupModal from './components/PopupModal'
import usePreloadedImage from './hooks/usePreloadedImage'
import {
  LEFT_PLACEHOLDER,
  POPUP_IMAGE_SRC,
  POPUP_PLACEHOLDER,
  RIGHT_PLACEHOLDER,
} from './constants/placeholders'

const CURSOR_SAFE_GAP_X = 70
const CURSOR_SAFE_GAP_Y = 50

function App() {
  const areaRef = useRef(null)
  const noBtnRef = useRef(null)
  const [accepted, setAccepted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noHoverCount, setNoHoverCount] = useState(0)
  const [noStage, setNoStage] = useState(0)
  const popupImageSrc = usePreloadedImage(POPUP_IMAGE_SRC, POPUP_PLACEHOLDER)
  const leftImageSrc = usePreloadedImage('/images/left_img.png', LEFT_PLACEHOLDER)
  const rightImageSrc = usePreloadedImage('/images/right_img.png', RIGHT_PLACEHOLDER)
  const requiredHoverCount = 5
  const canClickNo = noStage < 3 && noHoverCount >= requiredHoverCount
  const isNoTiny = noStage >= 2
  const isFinalNoStage = noStage >= 3
  const noText = noStage >= 2 ? 'U SURE? FINNALY, NO?' : noStage >= 1 ? 'REALY NO?' : 'No'
  const yesText = isFinalNoStage ? 'YES, NO WAY :)' : 'Yes'

  useEffect(() => {
    const setInitialPosition = () => {
      const area = areaRef.current
      const noBtn = noBtnRef.current

      if (!area || !noBtn) {
        return
      }

      const x = Math.max(0, area.clientWidth * 0.72 - noBtn.offsetWidth / 2)
      const y = Math.max(0, area.clientHeight * 0.5 - noBtn.offsetHeight / 2)
      setNoPosition({ x, y })
    }

    setInitialPosition()
    window.addEventListener('resize', setInitialPosition)

    return () => {
      window.removeEventListener('resize', setInitialPosition)
    }
  }, [])

  const getPointerFromEvent = (event) => {
    if (!event) {
      return null
    }

    if (event.touches && event.touches.length > 0) {
      return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY }
    }

    if (event.changedTouches && event.changedTouches.length > 0) {
      return {
        clientX: event.changedTouches[0].clientX,
        clientY: event.changedTouches[0].clientY,
      }
    }

    if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
      return { clientX: event.clientX, clientY: event.clientY }
    }

    return null
  }

  const moveNoButton = (pointer) => {
    const area = areaRef.current
    const noBtn = noBtnRef.current

    if (!area || !noBtn) {
      return
    }

    const maxX = Math.max(0, area.clientWidth - noBtn.offsetWidth)
    const maxY = Math.max(0, area.clientHeight - noBtn.offsetHeight)

    const rect = area.getBoundingClientRect()
    const localPointer = pointer
      ? { x: pointer.clientX - rect.left, y: pointer.clientY - rect.top }
      : null
    const isInForbiddenZone = (x, y) => {
      if (!localPointer) {
        return false
      }

      const centerX = x + noBtn.offsetWidth / 2
      const centerY = y + noBtn.offsetHeight / 2

      return (
        Math.abs(centerX - localPointer.x) <= CURSOR_SAFE_GAP_X &&
        Math.abs(centerY - localPointer.y) <= CURSOR_SAFE_GAP_Y
      )
    }

    let x = 0
    let y = 0
    let isFound = false

    for (let attempt = 0; attempt < 40; attempt += 1) {
      const candidateX = Math.random() * maxX
      const candidateY = Math.random() * maxY

      if (!isInForbiddenZone(candidateX, candidateY)) {
        x = candidateX
        y = candidateY
        isFound = true
        break
      }
    }

    if (!isFound) {
      const corners = [
        { x: 0, y: 0 },
        { x: maxX, y: 0 },
        { x: 0, y: maxY },
        { x: maxX, y: maxY },
      ]
      const best = corners
        .map((corner) => ({
          ...corner,
          score: localPointer
            ? Math.hypot(
                corner.x + noBtn.offsetWidth / 2 - localPointer.x,
                corner.y + noBtn.offsetHeight / 2 - localPointer.y
              )
            : 0,
        }))
        .sort((a, b) => b.score - a.score)[0]

      x = best.x
      y = best.y
    }

    setNoPosition({ x, y })
  }

  const handleNoMouseEnter = (event) => {
    if (isFinalNoStage) {
      return
    }

    if (canClickNo) {
      return
    }

    const nextCount = noHoverCount + 1
    setNoHoverCount(nextCount)

    if (nextCount < requiredHoverCount) {
      moveNoButton(getPointerFromEvent(event))
    }
  }

  const handleNoTouchStart = (event) => {
    if (isFinalNoStage) {
      return
    }

    if (canClickNo) {
      return
    }

    const nextCount = noHoverCount + 1
    setNoHoverCount(nextCount)

    if (nextCount < requiredHoverCount) {
      event.preventDefault()
      moveNoButton(getPointerFromEvent(event))
    }
  }

  const handleNoClick = (event) => {
    if (!canClickNo || isFinalNoStage) {
      return
    }

    if (noStage < 2) {
      moveNoButton(getPointerFromEvent(event))
    }

    setNoHoverCount(0)
    setNoStage((currentStage) => Math.min(currentStage + 1, 3))
  }

  const handleYesClick = () => {
    setAccepted(true)
    setIsModalOpen(true)
  }

  return (
    <>
      <CelebrationLayer accepted={accepted} />

      <PopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        popupImageSrc={popupImageSrc}
        popupPlaceholder={POPUP_PLACEHOLDER}
      />

      <main className="card">
        <p className="subtitle">14 February Special</p>
        <h1>{accepted ? 'Best choice ever!' : 'Will you be my Valentine?'}</h1>

        <ImageGallery
          leftSrc={leftImageSrc}
          rightSrc={rightImageSrc}
          leftPlaceholder={LEFT_PLACEHOLDER}
          rightPlaceholder={RIGHT_PLACEHOLDER}
        />

        <ActionButtons
          areaRef={areaRef}
          noBtnRef={noBtnRef}
          noPosition={noPosition}
          yesText={yesText}
          noText={noText}
          isNoDimmed={noStage >= 1}
          isNoTiny={isNoTiny}
          isNoHidden={isFinalNoStage}
          isYesFullscreen={isFinalNoStage}
          onYesClick={handleYesClick}
          onNoMouseEnter={handleNoMouseEnter}
          onNoTouchStart={handleNoTouchStart}
          onNoClick={handleNoClick}
        />

        <p className={`hint ${accepted ? '' : 'hint-tip'}`}>
          {accepted ? "Yay! Happy Valentine's Day! <3" : 'Tip: try catching the "No" button.'}
        </p>
      </main>
    </>
  )
}

export default App

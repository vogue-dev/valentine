function PopupModal({ isOpen, onClose, popupImageSrc, popupPlaceholder }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="best-choice-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="best-choice-title">Cupid approved!</h2>
        <img
          className="modal-image"
          src={popupImageSrc}
          loading="eager"
          fetchPriority="high"
          alt="Popup valentine image"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = popupPlaceholder
          }}
        />
      </div>
    </div>
  )
}

export default PopupModal

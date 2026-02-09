function ActionButtons({
  areaRef,
  noBtnRef,
  noPosition,
  yesText,
  noText,
  isNoDimmed,
  isNoTiny,
  isNoHidden,
  isYesFullscreen,
  onYesClick,
  onNoMouseEnter,
  onNoTouchStart,
  onNoClick,
}) {
  const buttonsClassName = `buttons${isYesFullscreen ? ' buttons-final-stage' : ''}`
  const yesClassName = `btn btn-yes${isYesFullscreen ? ' btn-yes-fullscreen' : ''}`
  const noClassName = `btn btn-no${isNoDimmed ? ' btn-no-dimmed' : ''}${isNoTiny ? ' btn-no-tiny' : ''}${isNoHidden ? ' btn-no-hidden' : ''}`

  return (
    <div className={buttonsClassName} ref={areaRef}>
      <button className={yesClassName} type="button" onClick={onYesClick}>
        {yesText}
      </button>
      <button
        className={noClassName}
        ref={noBtnRef}
        type="button"
        style={{ left: `${noPosition.x}px`, top: `${noPosition.y}px` }}
        onMouseEnter={onNoMouseEnter}
        onTouchStart={onNoTouchStart}
        onFocus={onNoMouseEnter}
        onClick={onNoClick}
      >
        {noText}
      </button>
    </div>
  )
}

export default ActionButtons

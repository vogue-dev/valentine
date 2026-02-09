function ImageGallery({ leftSrc, rightSrc, leftPlaceholder, rightPlaceholder }) {
  return (
    <div className="images-row">
      <img
        src={leftSrc}
        alt="Left valentine image"
        onError={(event) => {
          event.currentTarget.onerror = null
          event.currentTarget.src = leftPlaceholder
        }}
      />
      <img
        src={rightSrc}
        alt="Right valentine image"
        onError={(event) => {
          event.currentTarget.onerror = null
          event.currentTarget.src = rightPlaceholder
        }}
      />
    </div>
  )
}

export default ImageGallery

const makePlaceholder = (label) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#ffe7f1"/>
      <text x="400" y="250" text-anchor="middle" dominant-baseline="middle" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="42" fill="#b84c76">${label}</text>
    </svg>`
  )}`

export const LEFT_PLACEHOLDER = makePlaceholder('Funny valentine image')
export const RIGHT_PLACEHOLDER = makePlaceholder('Cute valentine image')
export const POPUP_PLACEHOLDER = makePlaceholder('Popup valentine image')
export const POPUP_IMAGE_SRC = '/images/popup_img.png'

'use strict'
function initFilp() {
//   $('.dream-flip-toggle').click(function () {
//     $('.flip-container').toggleClass('flip-it')
//   })
}
$(document).ready(function () {
  $('body').overlayScrollbars({
    className: (
      window.backgroundDark || window.backgroundImageDark
        ? localStore.getItem('hugo-theme-dream-is-dark')
        : window.darkNav
    )
      ? 'os-theme-light'
      : 'os-theme-dark',
    nativeScrollbarsOverlaid: { initialize: !1 },
    scrollbars: { autoHide: 'scroll' },
  }),
    initFilp()
})

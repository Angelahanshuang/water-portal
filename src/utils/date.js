export function formatDate(date) {
  var year = date.substr(0, 4)
  var month = date.substr(4, 2)
  var day = date.substr(6, 2)
  var hour = date.substr(8, 2)
  var min = date.substr(10, 2)
  var sec = date.substr(12, 2)
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
}

export function formatShortDate(date) {
  var year = date.substr(0, 4)
  var month = date.substr(4, 2)
  var day = date.substr(6, 2)
  return year + '-' + month + '-' + day + ' 00:00:00'
}

export function TencentMap() {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      resolve(qq)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=CYOBZ-DI6CW-K6ARA-RO4KR-XCDJT-SZFAT'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

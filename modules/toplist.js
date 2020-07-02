module.exports = (query = {id: 26}, request) => {
  return new Promise(((resolve, reject) => {
    request(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?page=detail&tpl=macv4&type=top&topid=${query.id}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`)
        .then(response => {
          const answer = {
            statusCode: 200,
            statusMessage: 'OK',
            body: {top_id: query.id, data: response.data},
            cookie: []
          }
          resolve(answer)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
  }))
}

module.exports = (query, request) => {
  return new Promise(((resolve, reject) => {
    // 传入中文时需要进行编码
    query.keyword = encodeURIComponent(query.keyword,"UTF-8")
    request(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=2&w=${query.keyword}&format=json`)
        .then(response => {
          let songList = response.data
          const answer = {status: 200, body: {keyword: query.keyword, songList}, cookie: []}
          resolve(answer)
        })
        .catch(function (error) {
          reject(error)
        })
  }))
}
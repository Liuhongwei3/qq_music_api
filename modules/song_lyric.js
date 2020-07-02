module.exports = (query, request) => {
  // const data = {
  //   id: query.id,
  // }
  return new Promise(((resolve, reject) => {
    request(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${query.id}&format=json&nobase64=1`)
        .then(response => {
          const answer = {
            statusCode: 200,
            statusMessage: 'OK',
            body: {song_id: query.id, data: response.data},
            cookie: []
          }
          if(response.data.code === 0){
            resolve(answer)
          }else {
            reject("error")
          }
        })
        .catch(function (error) {
          reject(error)
        })
  }))
}

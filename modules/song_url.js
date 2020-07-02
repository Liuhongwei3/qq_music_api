module.exports = (query, request) => {
  return new Promise(((resolve, reject) => {
    request(`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22${query.id}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`)
        .then(response => {
          let {data} = response.data.req_0
          let sips = data.sip
          let purl = data.midurlinfo[0].purl
          const song_url1 = sips[0] + purl
          const song_url2 = sips[1] + purl
          const answer = {status: 200, body: {song_id: query.id, song_url1, song_url2}, cookie: []}
          resolve(answer)
        })
        .catch(function (error) {
          reject(error)
        })
  }))
}
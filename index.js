// Modules
const request = require('request')
const cheerio = require('cheerio')

// Limetorrents base URL
let limetorrentsURL = 'https://www.limetorrents.cc'

module.exports = {
  search: function(keyword, cb) {
    let torrents = []
    var reqURL = limetorrentsURL + '/search/all/' + keyword + '/seeds/1/'
    request(reqURL, function(err, res, body) {
      var $ = cheerio.load(body)
      $('table.table2 tr').each(function(index, el) {
        var torrent = {}
        torrent.name = $(this).find('td.tdleft .tt-name a:nth-child(2)').text()
        torrent.size = $(this).find('td.tdnormal:nth-child(3)').text()
        torrent.seeders = $(this).find('td.tdseed').text()
        torrent.leechers = $(this).find('td.tdleech').text()
        torrent.url = limetorrentsURL + $(this).find('td.tdleft .tt-name a:nth-child(2)').attr('href')
        if (torrent.name !== '') {
          torrents.push(torrent)
        }
      })
      return cb(null, torrents)
    })
  }
}

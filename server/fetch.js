const fetch = require('node-fetch');

module.exports =  async function fetchData (url) {
    return fetch(url).then(res => res.json()).catch(err => console.error(err));
}
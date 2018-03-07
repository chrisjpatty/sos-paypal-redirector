import parseURLQuery from 'decode-query-string'

const params = parseURLQuery(window.location.search);
const description = params.DESCRIPTION
const origin = description.split('|||')[1].split('=')[1]
console.log(origin);
window.location.replace(origin + window.location.search)

const endpoint = "http://192.168.1.111:3000/nav";
const cachePath = "assets/cache.json";

function requestFailed(resp) {
  return resp.code !== 0 || resp.data == null
}

function readCache() {
  const data = $file.read(cachePath);
  if (data) {
    return JSON.parse(data.string);
  } else {
    return [];
  }
}

async function fetch() {
  let response = await $http.post(endpoint)
  const items = response.data.data
  let rankList = (await $http.get('https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all')).data.data.list
  rankList = rankList.slice(0,6)
  $cache.set("rankList", rankList);
  const file = await $http.download(items.face);
  const image = file.data.image;
  $cache.set("image", image);
  return items
}

exports.fetch = fetch;
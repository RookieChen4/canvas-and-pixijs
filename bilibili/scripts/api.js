const endpoint = "http://192.168.0.113:3000/nav";
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
  const file = await $http.download(items.face);
  const image = file.data.image;
  $cache.set("image", image);
  return items
}

exports.fetch = fetch;
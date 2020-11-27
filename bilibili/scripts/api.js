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
  const fdata = await $http.get('https://api.bilibili.com/x/relation/stat?vmid=37539830&jsonp=jsonp')
  $cache.set("fdata", fdata.data.data);
  const following = await $http.get('http://api.bilibili.com/x/relation/followings?vmid=37539830')
  $cache.set("following", following.data.data.list.slice(0,6));
  const followers = await $http.get('http://api.bilibili.com/x/relation/followers?vmid=37539830')
  $cache.set("followers", followers.data.data.list.slice(0,6));
  const voice = await $http.get('https://api.bilibili.com/x/web-interface/search/default')
  $cache.set("voice", voice.data.data.show_name);
  
  const videoList = await $http.get('https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=1&ps=15&vmid=37539830&ts=1606439330302')
  $cache.set("videoList", videoList.data.data.list.slice(0,4));

  // let temp = await Promise.all(videoList.data.data.list.slice(0,4).map(it => {
  //   return $http.download(it.cover)
  // }));
  // const cover = temp.map(it => it.data.image)
  // $cache.set("cover", cover);


  // const file = await $http.download(items.face);
  // const image = file.data.image;
  // $cache.set("image", image);
  return items
}

exports.fetch = fetch;
const api_Key='AIzaSyAINkHeo2AWYBTNkrM7bc6E1SuvDFOpymc';
let video_http="https://www.googleapis.com/youtube/v3/videos?"
let channel="https://www.googleapis.com/youtube/v3/channels?"
// let playListurl="https://www.googleapis.com/youtube/v3/playlistItems?"

fetch(video_http + new URLSearchParams({
    key: api_Key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'IN'
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data)
    data.items.forEach(item=>{
        getChannelIcon(item)
    })
})
.catch(err=>console.log(err))

const getChannelIcon=(video_data)=>{
    fetch(channel+new URLSearchParams({
      key:api_Key,
      part:'snippet',
      id:video_data.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
    video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url
    console.log(video_data)
     makeVideoPage(video_data)
    })
  }

  const makeVideoPage=(data)=>{
    videolist.innerHTML += `
    
    <div class="display-videos" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
              <img src="${data.snippet.thumbnails.high.url}" class="alter" alt="">
            <div class="video-content">
<img src="${data.channelThumbnail}" class="channel-icon" alt="">
               <div class="info">
                   <h4 class="title">${data.snippet.title}</h4>
                   <p class="channel-name">${data.snippet.channelTitle}</p>
               </div>
            </div>
    </div> `
}


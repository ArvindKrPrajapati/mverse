export const videoJs = `
const video=document.querySelector("video")
let start = {};
var mode="contain"
var action=true
const distance = (event) => {
    return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
};

video?.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      action=true
      event.preventDefault();
      start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
      start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
      start.distance = distance(event);
    }
  });


  video?.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2 && action) {
      event.preventDefault(); 
      
        const deltaDistance = distance(event);
       if(start.distance>deltaDistance){
        if (mode == "cover") {
            video.style.objectFit = "fill"
            mode = "fill"
        } else if (mode == "fill") {
            video.style.objectFit = "contain"
            mode = "contain"
        }
        action = false
        }
       if(start.distance<deltaDistance){
        if (mode == "contain") {
            video.style.objectFit = "fill"
            mode = "fill"
        } else if (mode == "fill") {
            video.style.objectFit = "cover"
            mode = "cover"
        }
           action=false
         }
    }
  });



video?.addEventListener("touchend",()=>{
    action=true;
    let fs=document.webkitIsFullScreen
  window.ReactNativeWebView.postMessage(JSON.stringify({isFullScreen:fs,mode}))
  })

`;
import Player from '@vimeo/player';
import { throttle } from 'lodash';

// console.log(throttle);

const _throttle = throttle(onTimeUpdate, 1000);

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

let timeVideoStopped = JSON.parse(localStorage.getItem("videoplayer-current-time"));

player.setCurrentTime(timeVideoStopped).then(function() {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
        default:
            // some other error occurred
            break;
    }
});

player.on('timeupdate', _throttle);

function onTimeUpdate() {
    // console.log("function is working")
    player.getCurrentTime().then(function (seconds) {

        let videPlaybackTime = JSON.stringify(seconds);
        localStorage.setItem("videoplayer-current-time", videPlaybackTime);
        
    }).catch(function(error) {
    console.log(error)
    });

};



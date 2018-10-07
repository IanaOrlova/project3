// document.querySelector("video").onclick = function(){
//     if(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2){
//         this.pause();
//         this.controls = false;
//     }
//     else if(this.paused){
//         this.play();
//         this.controls = true;
//     }
// }


// $(document).ready(function() {
//     $(".set > a").on("click", function() {
//         if ($(this).hasClass("active")) {
//             $(this).removeClass("active");
//             $(this)
//                 .siblings(".content")
//                 .slideUp(200);
//             $(".set > a i")
//                 .removeClass("fa-minus")
//                 .addClass("fa-plus");
//         } else {
//             $(".set > a i")
//                 .removeClass("fa-minus")
//                 .addClass("fa-plus");
//             $(this)
//                 .find("i")
//                 .removeClass("fa-plus")
//                 .addClass("fa-minus");
//             $(".set > a").removeClass("active");
//             $(this).addClass("active");
//             $(".content").slideUp(200);
//             $(this)
//                 .siblings(".content")
//                 .slideDown(200);
//         }
//     });
// });
var getaudio = $('#player')[0];
/* Get the audio from the player (using the player's ID), the [0] is necessary */
var mouseovertimer;
/* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
var audiostatus = 'off';
/* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */

// $(document).on('mouseenter', '.speaker', function() {
//     /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
//     if (!mouseovertimer) {
//         mouseovertimer = window.setTimeout(function() {
//             mouseovertimer = null;
//             if (!$('.speaker').hasClass("speakerplay")) {
//                 getaudio.load();
//                 /* Loads the audio */
//                 getaudio.play();
//                 /* Play the audio (starting at the beginning of the track) */
//                 $('.speaker').addClass('speakerplay');
//                 return false;
//             }
//         }, 1000);
//     }
// });

$(document).on('mouseleave', '.speaker', function() {
    /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
    if (mouseovertimer) {
        window.clearTimeout(mouseovertimer);
        mouseovertimer = null;
    }
});

$(document).on('click touchend', '.speaker', function() {
    /* Touchend is necessary for mobile devices, click alone won't work */
    if (!$('.speaker').hasClass("speakerplay")) {
        if (audiostatus == 'off') {
            $('.speaker').addClass('speakerplay');
            getaudio.load();
            getaudio.play();
            window.clearTimeout(mouseovertimer);
            audiostatus = 'on';
            return false;
        } else if (audiostatus == 'on') {
            $('.speaker').addClass('speakerplay');
            getaudio.play()
        }
    } else if ($('.speaker').hasClass("speakerplay")) {
        getaudio.pause();
        $('.speaker').removeClass('speakerplay');
        window.clearTimeout(mouseovertimer);
        audiostatus = 'on';
    }
});
//
// $('#player').on('ended', function() {
//     $('.speaker').removeClass('speakerplay');
//     /*When the audio has finished playing, remove the class speakerplay*/
//     audiostatus = 'off';
//     /*Set the status back to off*/
// });






flowplayer("a.myPlayer", "flowplayer/flowplayer-3.2.18.swf", {
    clip:  {
        autoPlay: false,
        autoBuffering: true
    },
    plugins: {
        controls: {
            url: "flowplayer/flowplayer.controls-3.2.16.swf",

            // customize the appearance to make the control bar transparent
            backgroundColor: "transparent",
            backgroundGradient: "none",
            sliderColor: '#FFFFFF',
            sliderBorder: '1.5px solid rgba(160,160,160,0.7)',
            volumeSliderColor: '#FFFFFF',
            volumeBorder: '1.5px solid rgba(160,160,160,0.7)',

            timeColor: '#ffffff',
            durationColor: '#535353',

            tooltipColor: 'rgba(255, 255, 255, 0.7)',
            tooltipTextColor: '#000000'

        }
    }
});

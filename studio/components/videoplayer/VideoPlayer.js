import React from 'react'

const VideoPlayer = ({ value }) => {
    
    const url = value.url
    const responsiveVideoContainer = {
        padding: "56.25% 0 0 0",
        position: "relative"
    }

    const responsiveVideoPlayer = {
        position: "absolute",
        top: 0, 
        left: 0,
        width: "100%",
        height: "100%"
    }

    if (url) {

        // install https://www.npmjs.com/package/get-video-id, to get Vimeo or YouTube IDs
        const getVideoId = require('get-video-id')

        const id = getVideoId(url).id
        const service = getVideoId(url).service
    
        const vimeoEmbedUrl = 'https://player.vimeo.com/video/' + id
        const youtubeEmbedUrl = 'https://www.youtube.com/embed/' + id
    
    
        if (!id) {
            return <div>Missing YouTube or Vimeo URL</div>
        }
    
        if (service === 'vimeo') {
            return (
                <div style={responsiveVideoContainer}>
                <iframe src={vimeoEmbedUrl} style={responsiveVideoPlayer} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
            )
        }
    
        if (service === 'youtube') {
            return (
                <div style={responsiveVideoContainer}>
                <iframe src={youtubeEmbedUrl} style={responsiveVideoPlayer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            )
        }
    } 

    return <div><h1>Embeded</h1></div>
    
}

export default VideoPlayer
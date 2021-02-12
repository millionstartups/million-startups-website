import GetVideoId from 'get-video-id'


const Video = ({url}) => {
    //const url = 'https://vimeo.com/449182143'
    const renderVideo = GetVideoId(url)

    return (
        
            <div     
            style={{
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0 
              }}>
            {renderVideo.service === 'youtube' && 
            <iframe 
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                marginBottom: '1rem'
              }}
            frameBorder="0" 
            src={`https://www.youtube.com/embed/${renderVideo.id}?modestbranding=1&autoplay=0&showinfo=0&rel=0&origin=https://themillionstartups.com`}
            crossOrigin='an'
            />
            }
            {renderVideo.service === 'vimeo' && 
            <iframe     
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            src={`https://player.vimeo.com/video/${renderVideo.id}`}
          
            />
            }
            </div>
    )
}

export default Video
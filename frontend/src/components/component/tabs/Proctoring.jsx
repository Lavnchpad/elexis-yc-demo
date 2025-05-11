
const Proctoring = ({details}) => {
  // const snapshots = [one, two, three, four];
  if (!details) {
    return null
  }
  let {video=[], screenshots=[]} = details;
  return (
      <div className="video-container">
      {/* Video Player */}
      <div className="video-player">
        {video?.[0] &&
        <video
          width="100%"
          controls
            src={video[0] || ''} // Use your video URL here
          alt="Sample Video"
        >
          Your browser does not support the video tag.
        </video>
        }
      </div>

      {/* Snapshot Heading */}
      {
        screenshots?.length > 0 &&
        <>

      <h2 className="text-left my-4 text-xl font-semibold">Snapshots</h2>

      {/* Snapshots Below Video */}
      <div className="snapshots">
        {screenshots?.map((snapshot, index) => (
              <div key={index} className="snapshot-wrapper" >
            <img
              src={snapshot}
              alt={`Snapshot ${index + 1}`}
              className="snapshot-img"
            />
          </div>
        ))}
      </div>
        </>
      }

      {/* Styles */}
      <style jsx>{`
        .video-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }
        .video-player {
          margin-bottom: 20px;
        }
            .snapshot-heading {
          font-size: 1.5rem;
          margin: 20px 0;
          text-align: center;
          font-weight: bold;
          color: #333;
        }
          .snapshots {
          display: flex;
          flex-direction: column; /* Stack items vertically */
          gap: 20px; /* Space between snapshots */
          align-items: center;
        }
          .snapshot-img {
          max-width: 90%; /* Restrict image size */
          height: auto;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: transform 0.2s;
          cursor: pointer;
        }
          .snapshot-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
      
  )
}

export default Proctoring

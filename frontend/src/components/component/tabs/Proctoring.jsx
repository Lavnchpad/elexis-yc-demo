import React from "react";
import sample from "../../../assets/video/aditya_panchal_test_automation.mp4";
import one from "../../../assets/images/one.png";
import two from "../../../assets/images/two.png";
import three from "../../../assets/images/three.png";
import four from "../../../assets/images/four.png";

const Proctoring = () => {
  const snapshots = [one, two, three, four];
  return (
      <div className="video-container">
      {/* Video Player */}
      <div className="video-player">
        <video
          width="100%"
          controls
          src={sample} // Use your video URL here
          alt="Sample Video"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Snapshot Heading */}
      <h2 className="text-left my-4 text-xl font-semibold">Snapshots</h2>

      {/* Snapshots Below Video */}
      <div className="snapshots">
        {snapshots.map((snapshot, index) => (
          <div key={index} className="snapshot-wrapper">
            <img
              src={snapshot}
              alt={`Snapshot ${index + 1}`}
              className="snapshot-img"
            />
          </div>
        ))}
      </div>

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

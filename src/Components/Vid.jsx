import React, { useState, useEffect } from "react";

const Vid = ({
  onMultiplierChange,
  onFileChange,
  selectedFrameSizes,
  selectedPlaces,
  selectedSizesInFeet,
}) => {
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [frameStates, setFrameStates] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    if (selectedFrameSizes && selectedFrameSizes.length > 0) {
      setFrameStates(
        selectedFrameSizes.map(() => ({
          isFullSize: false,
          isResized: false,
          prevState: "resized",
        }))
      );
    }
    console.log("Selected Places:", selectedPlaces);
    console.log("Selected Sizes in Feet:", selectedSizesInFeet);
  }, [selectedFrameSizes, selectedPlaces, selectedSizesInFeet]);

  const checkVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.onerror = () => {
        reject("Error loading video");
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const calculateMultiplier = (duration) => {
    if (duration >= 1 && duration <= 7) return 1;
    if (duration >= 7 && duration <= 12) return 2;
    if (duration >= 12 && duration <= 17) return 3;
    if (duration >= 18 && duration <= 22) return 4;
    if (duration >= 22 && duration <= 27) return 5;
    if (duration >= 27 && duration <= 31) return 6;
    return 0; // This will not be reached since we already check for duration > 30 in handleFileChange
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      let multiplier = 1; // Default multiplier for images
      if (uploadedFile.type.startsWith("video")) {
        try {
          const duration = await checkVideoDuration(uploadedFile);
          if (duration > 30) {
            // Check for videos longer than 30 seconds
            alert("Video duration cannot exceed 30 seconds.");
            return;
          }
          multiplier = calculateMultiplier(duration); // Calculate multiplier based on duration
        } catch (error) {
          console.error(error);
          alert("Unable to process video file.");
          return;
        }
      }

      const fileURL = URL.createObjectURL(uploadedFile);
      setFile(fileURL);
      setMediaType(uploadedFile.type.startsWith("video") ? "video" : "image");
      setIsMinimized(false);
      setFrameStates(
        selectedFrameSizes.map(() => ({
          isFullSize: false,
          isResized: false,
          prevState: "resized",
        }))
      );

      onFileChange(uploadedFile, multiplier);
      onMultiplierChange(multiplier);
    }
  };

  const handleFullSize = (index) => {
    setFrameStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, isFullSize: true, isResized: false } : state
      )
    );
  };

  const handleResize = (index) => {
    setFrameStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, isResized: true, isFullSize: false } : state
      )
    );
  };

  const handleOk = () => {
    setFrameStates((prev) =>
      prev.map((state, i) => ({
        ...state,
        prevState: state.isFullSize ? "full-size" : "resized",
      }))
    );
    setIsMinimized(true);
  };

  const handleRestore = (index) => {
    setIsMinimized(false);
    setFrameStates((prev) =>
      prev.map((state, i) =>
        i === index
          ? {
              ...state,
              isFullSize: state.prevState === "full-size",
              isResized: state.prevState === "resized",
            }
          : state
      )
    );
  };

  const getPlaceInfo = (index) => {
    if (!selectedPlaces || selectedPlaces.length <= index) {
      console.log("No place data at index:", index);
      return "";
    }
    const placeFullName = selectedPlaces[index].trim();
    const sizeInFeet =
      selectedSizesInFeet && selectedSizesInFeet.length > index
        ? selectedSizesInFeet[index]
        : "";
    const sizeDisplay = sizeInFeet ? ` (Screen size: ${sizeInFeet})` : "";
    return `${placeFullName}${sizeDisplay}`;
  };

  return (
    <div>
      {selectedPlaces && selectedPlaces.length > 0 && (
        <div
          className="selected-places-header"
          style={{ marginBottom: "20px" }}
        >
          <h3>Selected Places:</h3>
          <ul>
            {selectedPlaces.map((place, index) => (
              <li key={index}>{getPlaceInfo(index)}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="upload-section">
        <input
          type="file"
          accept="image/, video/"
          onChange={handleFileChange}
          className="file-input"
          style={{ marginLeft: "30px" }}
        />
      </div>
      {selectedFrameSizes &&
        selectedFrameSizes.length > 0 &&
        frameStates.length === selectedFrameSizes.length && (
          <>
            {selectedFrameSizes.map((frameSize, index) => (
              <div key={index} className="frame-container">
                {!isMinimized && (
                  <p className="place-info">
                    {getPlaceInfo(index) || "No data available"}
                  </p>
                )}
                {!isMinimized && (
                  <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <span
                      onClick={() => handleFullSize(index)}
                      className="fullsize-span"
                    >
                      Full Size
                    </span>
                    <span
                      onClick={() => handleResize(index)}
                      className="resize-span"
                    >
                      Resize
                    </span>
                  </div>
                )}
                {!isMinimized ? (
                  <div
                    className="billboard-frame"
                    style={{
                      backgroundColor: "black",
                      width: frameSize.width,
                      height: frameSize.height,
                      marginBottom: "10px",
                    }}
                  >
                    {file ? (
                      mediaType === "video" ? (
                        <video
                          src={file}
                          className={`media-content ${
                            frameStates[index].isFullSize
                              ? "full-size"
                              : frameStates[index].isResized
                              ? "resized"
                              : ""
                          }`}
                          controls
                        />
                      ) : (
                        <img
                          src={file}
                          alt={`Uploaded ${index}`}
                          className={`media-content ${
                            frameStates[index].isFullSize
                              ? "full-size"
                              : frameStates[index].isResized
                              ? "resized"
                              : ""
                          }`}
                        />
                      )
                    ) : (
                      <p style={{ color: "#fff" }}>
                        Please upload your advertisement image or video here.
                      </p>
                    )}
                  </div>
                ) : (
                  <div
                    className="minimized-frame"
                    onClick={() => handleRestore(index)}
                    style={{ marginBottom: "10px" }}
                  >
                    {file && (
                      <img
                        src={file}
                        alt={`Minimized ${index}`}
                        className={`mini-media-content ${
                          frameStates[index].prevState === "full-size"
                            ? "full-size"
                            : "resized"
                        }`}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            {!isMinimized && (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <span onClick={handleOk} className="ok-span">
                  OK
                </span>
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default Vid;

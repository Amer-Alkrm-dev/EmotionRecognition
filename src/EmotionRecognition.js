import "./css/Recognition.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "./DataTable";
import { signOut } from "./Authentication";

function EmotionRecognition() {
  const [image, setImage] = useState();
  const [emotions, setEmotions] = useState();
  const navigate = useNavigate(); // Initialize navigate
  const API_KEY = process.env.REACT_APP_API_KEY || "";

  const handleSignout = async (e) => {
    e.preventDefault();
    await signOut();
    navigate("/");
  };

  function handleChange(event) {
    let reader = new FileReader();
    let selectedImage = event.target.files[0];
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);

      reader.onload = () => {
        setImage(reader.result);
      };
      setEmotions(null);
    }
  }

  const handleEmotionRecognition = async () => {
    try {
      console.log("Calling API gateway to recognize the emotions.");
      const response = await fetch(
        "https://hv8fvab9uj.execute-api.us-east-1.amazonaws.com/dev2/recognize-emotion",
        {
          method: "POST",
          headers: { "x-api-key": API_KEY },
          body: JSON.stringify({ data: image }),
        }
      );
      if (!response.ok) {
        throw new Error(
          "Call to API gateway failed, response: " + (await response.text())
        );
      }
      console.log("Emotions recognized.");
      const json_response = await response.json();

      // Extract the base64-encoded image data from the JSON response
      const base64Image = json_response.image;
      // Create a data URI for the image
      const imageURI = `data:image/jpeg;base64,${base64Image}`;

      setImage(imageURI);
      setEmotions(json_response.emotions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <header className="center-content">
          <h1>Facial Emotion Recognition</h1>
        </header>
        <body>
          {/* <p>
              Detect faces and recognize facial expression
            </p> */}
          {image && (
            <img
              src={image}
              alt="facial expression"
              className="centered-image"
            />
          )}
          <div>
            <label htmlFor="selectImage" className="custom-button">
              Select an image
              <input
                type="file"
                id="selectImage"
                className="file-input"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="recognizeEmotion" className="custom-button">
              Face expression
              <button
                type="file"
                id="recognizeEmotion"
                className="file-input"
                accept="image/*"
                onClick={handleEmotionRecognition}
              />
            </label>
          </div>
          {emotions && <TableComponent emotions={emotions} />}
          <p id="signout-link" onClick={handleSignout}>
            Sign Out
          </p>
        </body>
      </div>
    </div>
  );
}

export default EmotionRecognition;

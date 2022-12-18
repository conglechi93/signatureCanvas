import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./App.css";
import "./sigCanvas.css";

function App() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  }
    

  return (
    <div className="App">
      <head>
        <div>
          
        </div>
      </head>
      <h1>Quản lí chữ ký số </h1>
      <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <button className="save-btn" onClick={save}>Lưu chữ ký</button>
            <button className="clear-btn" onClick={clear}>Vẽ lại</button>

      {/* <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
        closeOnDocumentClick={false}
      >
        {close => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={close}>Close</button>
          </>
        )}
      </Popup> */}
      <br />
      <br />
      
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      {imageURL ? (
        <img
          className="signature-img"
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null}
    </div>
  );
}

export default App;

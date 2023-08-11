import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import loader from "../../assets/loader.svg";
import classes from "./FileDrag.module.css";

const DragDrop = ({ setQrCode }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      // Make the upload request here
      const response = await axios.post(
        "http://localhost:7777/api/assets/upload",
        formData
      );
      const url = response.data.qrCodeLink;
      setTimeout(() => {
        setIsUploading(false);
        setQrCode(url);
        setTimeout(() => {
          if (document.getElementById("qr")) {
            document.getElementById("qr").scrollIntoView();
          }
        }, 200);
      }, 2000);

      // ... Handle any post-upload actions you might have here
    } catch (error) {
      console.log(error);
      // Handle upload errors here
      setIsUploading(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.box}>
      {isUploading ? (
        <div>
          <img src={loader} alt="Loading" width={200} height={200} />
        </div>
      ) : (
        <>
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              <button className={classes.boxButton}>Upload Video</button>
            </p>
          )}
          {isDragActive ? (
            <></>
          ) : (
            <div className={classes.boxText}>
              or drop a file,
              <br />
              <span>paste image</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default DragDrop;

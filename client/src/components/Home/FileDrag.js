import React, { useCallback } from "react";
import classes from "./FileDrag.module.css";
import { useDropzone } from "react-dropzone";
const DragDrop = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.box}>
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
    </div>
  );
};
export default DragDrop;

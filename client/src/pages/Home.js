import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import DragDrop from "../components/Home/FileDrag";
import asset from "../assets/asset.png";
const Home = () => {
  const [qrCode, setQrCode] = useState("");
  const [newQR, setNewQR] = useState("");
  useEffect(() => {
    setNewQR(qrCode);
  }, [qrCode]);
  return (
    <section className="py-3">
      <div className="container row my-3 mx-auto">
        <div className="col-lg-6 row my-3 justify-content-center align-items-center">
          <div className="col-xl-6 col-lg-12 col-md-6 d-flex justify-content-xl-end justify-content-lg-center justify-content-md-end justify-content-center">
            <img src={asset} alt="" className={classes.img} />
          </div>
          <div className="col-xl-6 col-lg-12 col-md-6">
            <h2 className={`display-4 ${classes.mainText}`}>
              TURN ASSESTS TO QR
            </h2>
            <p className={classes.subtitle}>
              Reliable and <span>Free Forever!!</span>
            </p>
          </div>
        </div>
        <div className="col-lg-6 my-5">
          <DragDrop setQrCode={setQrCode} />
        </div>
      </div>
      {qrCode.length !== 0 && (
        <>
          <hr />
          <div id="qr" className="container">
            <h3>Results: </h3>
            <div className="d-flex justify-content-center">
              <img src={newQR} alt={newQR} className={classes.qrCode} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import loader from "../assets/loader.svg";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you have Bootstrap CSS imported

function Asset() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFile() {
      const response = await axios.get(
        `http://localhost:7777/api/assets/file/${id}`
      );
      setFile(response.data);
      setLoading(false);
    }
    fetchFile();
  }, [id]);

  const fileExtension = file?.url.split(".").pop();

  return (
    <div className="container mt-5">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <img src={loader} alt="Loading..." width={200} height={200} />
        </div>
      ) : !file ? (
        <div className="alert alert-danger" role="alert">
          404 Error: File not found!
        </div>
      ) : (
        <>
          {fileExtension === "png" ? (
            <div className="text-center">
              <img
                className="img-fluid"
                src={`http://localhost:7777/${file.url}`}
                alt="Uploaded Content"
                style={{
                  maxHeight: "400px",
                }}
              />
            </div>
          ) : fileExtension === "pdf" ? (
            <div className="border rounded p-2">
              <iframe
                src={`http://localhost:7777/${file.url}`}
                className="w-100"
                height="600"
                style={{ border: "none" }}
              ></iframe>
            </div>
          ) : (
            <div className="alert alert-warning" role="alert">
              Unsupported file format.
            </div>
          )}

          <div className="text-center mt-3">
            <a
              href={`http://localhost:7777/${file.url}`}
              className="btn btn-primary"
              download
            >
              Download
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Asset;

import React, { useEffect, useState } from "react";
import { Table, Container, Card, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";
const ProfilePage = () => {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user-data/:code")
      .then((res) => {
        setJsonData(res.data);
      })
      .catch((e) => {
        console.log("Error fetching details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const generateGPAData = () => {
    const labels = [];
    const data = [];

    jsonData.CUST_Courses.forEach((semester) => {
      labels.push(semester.Semester);
      data.push(semester.GPA);
    });

    return {
      labels,
      datasets: [
        {
          label: "GPA",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return loading ? (
    <div className="container d-flex align-items-center justify-content-center">
      Loading
    </div>
  ) : (
    <Container>
      <h1 className="mt-4 mb-4">Student Dashboard</h1>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Student Information</Card.Header>
            <Card.Body>
              <Table striped bordered hover size="sm">
                <tbody>
                  {Object.keys(jsonData.Student_Info).map((key) => (
                    <tr key={key}>
                      <td>{key.replace("_", " ")}</td>
                      <td>{jsonData.Student_Info[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mb-4">
            <Card.Header>Academic Performance</Card.Header>
            <Card.Body>
              <Bar data={generateGPAData()} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header>Course Details</Card.Header>
        <Card.Body>
          {jsonData.CUST_Courses.map((semester, index) => (
            <div key={index}>
              <h5>{semester.Semester}</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Credit Hours</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.Courses.map((course, i) => (
                    <tr key={i}>
                      <td>{course.Course_Code}</td>
                      <td>{course.Course_Title}</td>
                      <td>{course.Credit_Hours}</td>
                      <td>{course.Grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;

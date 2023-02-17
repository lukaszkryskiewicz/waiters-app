import { Row, Col } from "react-bootstrap";
import Tables from "../../features/Tables/Tables";


const Home = () => {

  return (
    <>
      <Row className="my-3">
        <Col><h1>All Tables</h1></Col>
      </Row>
      <Tables />
    </>
  )
}

export default Home;
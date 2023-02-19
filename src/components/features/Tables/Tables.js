import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../../redux/tablesRedux";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const Tables = () => {
  const tables = useSelector(getAllTables)
  console.log((tables.length))

  return (
    <Row>
      {tables.length === 0 && <LoadingSpinner />}
      {tables.map(table =>
        <Row key={table.id} className="mb-4 border-bottom">
          <Col className="mb-4" lg={10}>
            <h2 className="d-inline m-3 ">Table {table.id}</h2>
            <p className="d-inline">Status: {table.status}</p>
          </Col>
          <Col lg={2} className="text-end">
            <Link to={"/table/" + table.id}><Button variant="primary">Show more</Button></Link>
          </Col>
        </Row>
      )}
    </Row>

  )
}

export default Tables;
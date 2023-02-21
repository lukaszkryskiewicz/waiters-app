import { Row, Col, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllTables } from "../../../redux/tablesRedux";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { removeTableRequest } from "../../../redux/tablesRedux";


const Tables = () => {
  const tables = useSelector(getAllTables)
  const [tableId, setTableId] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => setTableId(id);
  const handleClose = () => setTableId(0)

  const handleDelete = () => {
    dispatch(removeTableRequest(tableId))
    setTableId(0)
    navigate("/")
  };

  if (tables.length === 0) return 'There are no tables'

  return (
    <Row>
      {tables.length === 0 && <LoadingSpinner />}
      {tables.map(table =>
        <Row key={table.id} className="mb-4 border-bottom">
          <Col className="mb-4" lg={8}>
            <h2 className="d-inline m-3 ">Table {table.id}</h2>
            <p className="d-inline">Status: {table.status}</p>
          </Col>
          <Col lg={4} className="text-end">
            <Link to={"/table/" + table.id}><Button variant="primary">Show more</Button></Link>
            <Button className="ms-3" variant="danger" onClick={() => handleClick(table.id)}>Delete</Button>
          </Col>
        </Row>
      )}
      <Modal show={tableId} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lorem Ipsum</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Row>

  )
}

export default Tables;
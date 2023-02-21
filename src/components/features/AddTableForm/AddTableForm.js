import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatusList } from "../../../redux/tableStatusRedux";
import { addTableRequest, getAllTables, } from "../../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";
import { freeTablesNumber } from "../../../utils/checkFreeTablesNumber";

const AddTableForm = () => {
  const statusList = useSelector(getStatusList)
  const tables = useSelector(getAllTables)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usedTableNumbersArr = []

  for (const table of tables) {
    usedTableNumbersArr.push(parseInt(table.id))
  }

  const freeTablesNumberArr = freeTablesNumber(usedTableNumbersArr)

  const [status, setStatus] = useState('free')
  const [peopleAmount, setPeopleAmount] = useState(0)
  const [id, setId] = useState(freeTablesNumberArr[0])


  if (peopleAmount < 0) setPeopleAmount(0);
  if (peopleAmount > 10) setPeopleAmount(10);


  const newTableInfo = {
    id: id.toString(),
    status: status,
    peopleAmount: peopleAmount,
    maxPeopleAmount: peopleAmount,
    bill: 0
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTableRequest(newTableInfo))
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Table {id}</h1>
      <Form.Group as={Row} className="my-4">
        <Form.Label column xs="auto">
          <span className="fw-bold">Table number:</span>
        </Form.Label>
        <Col sm={2}>
          <Form.Select value={id} name={"id"} onChange={(e) => setId(e.target.value)}>
            {freeTablesNumberArr.map(tableNumber => <option key={tableNumber}>{tableNumber}</option>)}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="my-4">
        <Form.Label column xs="auto">
          <span className="fw-bold">Status:</span>
        </Form.Label>
        <Col sm={4}>
          <Form.Select value={status} name={"status"} onChange={(e) => setStatus(e.target.value)}>
            <option>Select status...</option>
            {statusList.map(status => <option key={status}>{status}</option>)}
          </Form.Select>
        </Col>
      </Form.Group>
      <Row className="my-4">
        <Form.Label column xs="auto">
          <span className="fw-bold">People:</span>
        </Form.Label>
        <Col sm={1}>
          <Form.Group as={Col}>
            <Form.Control value={peopleAmount} type="text" name="peopleAmount" onChange={(e) => setPeopleAmount(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Button className="m-3" variant="primary" type="submit" >
        Add Table
      </Button>
    </Form>
  )

}

export default AddTableForm


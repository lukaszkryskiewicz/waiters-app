import { Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
//import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getStatusList } from "../../../redux/tableStatusRedux";
import { updateTableInfoRequest } from "../../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";

const TableForm = ({ id, table }) => {
  const statusList = useSelector(getStatusList)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const [status, setStatus] = useState(table.status)
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount)
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount)
  const [bill, setBill] = useState(table.bill)

  if (peopleAmount < 0) setPeopleAmount(0);
  if (peopleAmount > 10) setPeopleAmount(10);
  if (maxPeopleAmount < 0) setMaxPeopleAmount(0);
  if (maxPeopleAmount > 10) setPeopleAmount(10);
  if (peopleAmount > maxPeopleAmount) setPeopleAmount(maxPeopleAmount)

  console.log(status, peopleAmount, maxPeopleAmount, bill)

  const updatedTableInfo = {
    id: id,
    status: status,
    peopleAmount: peopleAmount,
    maxPeopleAmount: maxPeopleAmount,
    bill: bill
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateTableInfoRequest(updatedTableInfo))
    navigate("/");

  }

  useEffect(() => {
    if (status === "free" || status === "cleaning") {
      setPeopleAmount(0)
    }
  }, [status])

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Table {table.id}</h1>
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
        /
        <Col sm={1}>
          <Form.Group as={Col}>
            <Form.Control value={maxPeopleAmount} type="text" name="maxPeopleAmount" onChange={(e) => setMaxPeopleAmount(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      {status !== 'busy'
        ? <Row></Row>
        :
        <Row className="my-4">
          <Form.Label column xs="auto" className="me-4">
            <span className="fw-bold">Bill:</span>
          </Form.Label>
          <Col xs="auto">
            <span>$</span>
          </Col>
          <Col sm={1}>
            <Form.Group as={Col}>
              <Form.Control value={bill} type="text" name="peopleAmount" onChange={(e) => setBill(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
      }
      <Button className="m-3" variant="primary" type="submit" >
        Update
      </Button>
    </Form>
  )

}

export default TableForm


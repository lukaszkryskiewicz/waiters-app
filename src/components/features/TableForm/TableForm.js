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

  const newTableInfo = {
    id: id,
    status: status,
    peopleAmount: peopleAmount,
    maxPeopleAmount: maxPeopleAmount,
    bill: bill
  }

  console.log(newTableInfo)
  const handleSubmit = e => {
    e.preventDefault();
    console.log(newTableInfo)
    dispatch(updateTableInfoRequest(newTableInfo))
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


/* const PostForm = (props) => {
  const categories = useSelector(getAllCategories)
  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  const [newPost, setNewPost] = useState({
    title: props.title || '',
    shortDescription: props.shortDescription || '',
    content: props.content || '',
    publishedDate: props.publishedDate || new Date(),
    author: props.author || '',
    category: props.category || ''
  })
  const [contentError, setContentError] = useState(false)
  const [dateError, setDateError] = useState(false)


  const handleSubmit = () => {
    setContentError(!newPost.content)
    setDateError(!newPost.publishedDate)
    if (newPost.content && newPost.publishedDate) {
      props.action(newPost)
    }
  }

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <FormGroup register={register} errors={errors} type="text" placeholder="Enter title" name={"title"} value={newPost.title} onChange={handleChange}>Title</FormGroup>
      <FormGroup register={register} errors={errors} type="text" placeholder="Enter author" name={"author"} value={newPost.author} onChange={handleChange}>Author</FormGroup>
      <DatePicker selected={newPost.publishedDate} onChange={(date) => handleChange(date)} />
      {dateError && <small className="d-block form-text text-danger mt-2">Content can't be empty</small>}
      <Form.Select className='my-4' value={newPost.category} name={"category"} onChange={handleChange}>
        <option>Select Category...</option>
        {categories.map(category => <option key={category}>{category}</option>)}
      </Form.Select>
      <FormGroup register={register} errors={errors} type="text" as="textarea" rows={3} placeholder="Write here" name="shortDescription" value={newPost.shortDescription} onChange={handleChange}>Short description</FormGroup>
      <Form.Label> Content:</Form.Label>
      <ReactQuill theme="snow" placeholder="Write here" value={newPost.content} onChange={handleChange}></ReactQuill>
      {contentError && <small className="d-block form-text text-danger mt-2">Content can't be empty</small>}
      <Button className="m-3" variant="primary" type="submit" >
        {props.actionText}
      </Button>
    </Form>
  )
}

export default PostForm; */
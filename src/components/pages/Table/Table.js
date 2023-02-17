import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";

const Table = () => {
  const { id } = useParams();
  const table = useSelector(getTableById(id))

  return (
    <div>
      <h1>Table {table.id}</h1>
    </div>

  )


}

export default Table;
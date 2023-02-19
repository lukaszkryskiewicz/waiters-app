import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import TableForm from "../../features/TableForm/TableForm";


const Table = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id))

  if (!table) return <Navigate to="/" />

  console.log(table)


  return (
    <div>
      <TableForm id={id} table={table} />
    </div>

  )


}

export default Table;
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/Header/Header";
import NotFound from "./components/pages/NotFound/NotFound";
import Home from "./components/pages/Home/Home";
import Table from "./components/pages/Table/Table";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);


  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
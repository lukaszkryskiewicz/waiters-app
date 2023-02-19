import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <>
      <Spinner animation="border" role="status">
      </Spinner>
      <span className="mt-4">Loading...</span>
    </>
  );
}

export default LoadingSpinner;
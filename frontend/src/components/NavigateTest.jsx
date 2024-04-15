import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";

function NavigateTest() {
  const navigate = useNavigate();
  
  return (
  <Button variant="light" className="btn-test-link" size="lg" onClick={() => navigate('/test')}><b>Test</b></Button>
  );
}

export default NavigateTest;
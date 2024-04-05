import { useNavigate } from "react-router";

function NavigateTest() {
  const navigate = useNavigate();
  
  return (
  <button onClick={() => navigate('/test')}>Test</button>
  );
}

export default NavigateTest;
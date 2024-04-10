import { useNavigate } from "react-router";


function StudyGuide() {
  const navigate = useNavigate();

  return (
    //Study guide link to be inserted
     <button onClick={() => navigate('/test')}>Study Guide Link</button>
  );
}

export default StudyGuide;
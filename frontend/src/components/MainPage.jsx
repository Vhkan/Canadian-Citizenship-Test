import "../styles/MainPage.css";
import NavigateTest from "./NavigateTest";
import StudyGuide from "./StudyGuide";


function MainPage() {
  return (
    <div className="main-page-block">
      <div className="main-page-about-section">
      <h2 className="info-title">Online Canadian Citizenship Test 2024🍁</h2>
    <p className="main-page-info">Ready for your citizenship test? Study for the Canadian citizenship test in 2024 with the official study guide and actual test questions. 
      Learn about Canada's history, values, government and symbols with 80+ interactive lessons, quizzes and tests.</p>
      <StudyGuide/>
      <h4>Pass the Canadian Citizenship Test Today!</h4>
      <NavigateTest/>
      </div>
  </div>
  )
}

export default MainPage;
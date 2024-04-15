import "../styles/MainPage.css";
import NavigateTest from "./NavigateTest";
import StudyGuide from "./StudyGuide";


function MainPage() {
  return (
    <div>
    <div className="main-page-block">
      <div className="main-page-about-section">
        <h1 className="info-title">Online Canadian Citizenship Test 2024🍁</h1>
        <h5 className="main-page-info"> 
           Ready for your citizenship test? Study for the Canadian citizenship test in 2024 with the official study guide and actual test questions. 
           Learn about Canada's history, values, government and symbols with lessons, quizzes and tests.
        </h5>
        <h5 className="ready-to-test">Ready to test your knowledge in Canadian history, values, government and symbols?</h5>
        <div>
         <h4 className="pass-test-navigate">Pass the Canadian Citizenship Test Today!</h4>
          <NavigateTest/>
        </div>        
      </div>
      <div className="main-section-picture">
        <img src="/public/main-info-logo_2.png" alt="main-page-img" className="main-picture"/>
      </div>
    </div>

    

      <div className="secondary-page-block">
        <div className="secondary-page-about-section">
          <h1 className="secondary-info-title"> Official Study Guide🍁</h1>
          <div className="secondary-page-info">
            <h5> ✓ Based on Discover Canada: The Rights and Responsibilities of Citizenship</h5>
            <h5> ✓ Based on Discover Canada: The Rights and Responsibilities of Citizenship</h5>
            <h5> ✓ Based on Discover Canada: The Rights and Responsibilities of Citizenship</h5>
          </div>
          <div className="study-guide">
            <StudyGuide/>
          </div>
        </div>
          <div className="secondary-page-picture">
            <img src="/public/books.png" alt="secondary-page-img" className="secondary-picture"/>
          </div>
      </div>

    </div>
  )
}

export default MainPage;
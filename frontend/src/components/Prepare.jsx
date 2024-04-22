import "../styles/MainPage.css";
// MainPage Styles are used temporarily - to be replaced/edited with Prepare.css 
import NavigateTest from "./NavigateTest";
import StudyGuide from "./StudyGuide";

const Prepare = () => {

  return (
    <div className="secondary-page-block">
        <div className="secondary-page-about-section">
          <h1 className="secondary-info-title"> Prepare for the Test Today with the Official Study Guide🍁</h1>
          <div className="secondary-page-info">
            <h5> ✓ Based on Discover Canada: The Rights and Responsibilities of Citizenship</h5>
            <h5> ✓ Access to the official study guide material while preparing for your Citizenship test</h5>
            <h5> ✓ Unlimitead and the most accurate simulation of the official Canadian Citizenship test</h5>
          </div>

          <div className="discover-ca-info">
            <div className="study-guide">
              <StudyGuide/>
            </div>

            <div>
              <h5>Discover Canada is available in HTML or PDF: <a className="discovery-guide-link" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online.html" target="_blank">  «Read Online»</a></h5> 
              <h5>Discover Canada is available in Audio format: <a className="discovery-guide-link" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/discover-canada-audio.html" target="_blank">  «Listen»</a> </h5>
              <h5>Get Discover Canada as PDF or download the eBook: <a className="discovery-guide-link" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/download.html" target="_blank">  «Download»</a> </h5>
              <h5>Have a copy of Discover Canada sent to you: <a className="discovery-guide-link" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals.html#ordering" target="_blank">  «Order a Publication»</a> </h5>
            </div>
          </div>


          <div className="prepare-info">
            <h4 className="above-navigare-test" style={{ paddingTop: '2em', paddingBottom: '1em' }}>Click the test button below to see if you are ready for the citizenship test!</h4>
            <NavigateTest/>
            <h4 className="read-more" style={{ paddingTop: '1em' }}>Read more about the test below:</h4>

            <div className="about-test-info">
              <p style={{ fontSize: '19px', paddingTop: '0.5em', fontWeight: '500'  }}>The assessment comprises 20 questions spanning diverse categories. In the event of an incorrect response, there are up to 4 alternatives. Additionally, there may be up to 3 questions that have been skipped, which will be presented upon completion of the remaining questions in the test. </p>
            </div>
            
          </div>

        </div>
          <div className="secondary-page-picture">
            <img src="/public/books.png" alt="secondary-page-img" className="secondary-picture"/>
          </div>
      </div>
  )
}

export default Prepare;
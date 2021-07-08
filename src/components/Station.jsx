import { useContext } from "react"; 
import { useHistory } from "react-router-dom";
import { DataContext } from './Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components'
import { Form, Button, Container, Row, Col  } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  img {
      display: block;
      margin-left: auto;
      margin-right: auto;

  }
`

function Station() {

  const history = useHistory();
  const dataContext = useContext(DataContext)
  

  const handleRedirect = () =>{ 

    // Get Station ID, Year and Month from user input
    const eventStation = document.getElementById("stationId");
    const strStation = eventStation.value;
    dataContext.setStation( strStation );

    const eventYear = document.getElementById("year");
    const strYear = eventYear.value;
    dataContext.setYear( strYear );

    const eventMonth = document.getElementById("month");
    const strMonth = eventMonth.value;
    dataContext.setMonth( strMonth );

    // Redirect
    history.push("/weathers");
  }


  return (
    <>
      <GlobalStyle />
      <Container fluid >
        <Row>

          <Col className="align-self-center"  >

            {/* Style is to horizontally align the form */}
            <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
              {/* "align-self-center" vertically align the form */}
              <Form className="align-self-center" >

                <Form.Row >
                  <Form.Group controlId="formGridState">
                    <Form.Label>Choose weather station: </Form.Label>
                    <Form.Control as="select" defaultValue="S44" id="stationId" >
                      <option value="S44">Station 1</option>
                      <option value="S104">Station 2</option>
                      <option value="S24">Station 3</option>
                      <option value="S108">Station 4</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row >
                  <Form.Group controlId="formGridState">
                    <Form.Label>Choose year (<em>data to extract</em>): </Form.Label>
                    <Form.Control as="select" defaultValue="2017" id="year">
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row >
                  <Form.Group controlId="formGridState">
                    <Form.Label>Choose month (<em>data to extract</em>): </Form.Label>
                    <Form.Control as="select" defaultValue="01" id="month" >
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      <option value="05">May</option>
                      <option value="06">Jun</option>
                      <option value="07">Jul</option>
                      <option value="08">Aug</option>
                      <option value="09">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </Form.Control>
                  </Form.Group>

                </Form.Row>

                <Button variant="primary" type="submit" onClick={handleRedirect} >
                  Submit
                </Button>

                <br></br>

              </Form>

            </div>

          </Col>


          <Col>
            <img src="https://raw.githubusercontent.com/edangx100/APITest/main/public/sg_map_annotatedv3.JPG" usemap="#image-map" alt="singapore map" />

            <map name="image-map">
                <area target="_blank" alt="Station 1" title="Station 1" href="https://goo.gl/maps/pwDogjnHGWCmSLDYA" coords="261,380,25" shape="circle" />
                <area target="_blank" alt="Station 2" title="Station 2" href="https://goo.gl/maps/15UKd2WNZQKmjRcw8" coords="563,111,23" shape="circle" />
                <area target="_blank" alt="Station 3" title="Station 3" href="https://goo.gl/maps/15UKd2WNZQKmjRcw8" coords="1045,301,26" shape="circle" />
                <area target="_blank" alt="Station 4" title="Station 4" href="https://goo.gl/maps/JiXwyrVcYD5mtoDw5" coords="731,523,20" shape="circle" />
            </map>
          </Col>

        </Row>
      </Container>

    </>
  );
}

export default Station
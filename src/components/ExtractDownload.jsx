import { Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LineChart from "./LineChart"
import './ExtractDownload.css';



function ExtractDownload (props) {

    console.log( "ExtractDownload component" );
    console.log( props );


  return (
    <Row className="app-container align-items-center">
        <Col md={6} id='todo_container' >

            <div className="" >
                <Card bg="light" className="my-3" >
                    <Card.Header><strong>{props.dataType}</strong></Card.Header>
                    <Card.Body>

                        <Card.Text>
                            {props.extractStatus && <h2>Extracting {props.dataType}....</h2>}

                            {props.missDisplay && <p>Number of Missing records for {props.dataType}: {props.missCount}</p> }
                            <ol>
                                { (props.missList).map(ele => <li>{ele}</li>) }
                            </ol>

                        </Card.Text>
  
                        <div>
                            <Button variant="primary" onClick={props.callExtractDataAPI} disabled={props.disableExtractButton}>Extract from data.gov.sg</Button>
                        </div>
                        <br></br>
                        <Button variant="primary" onClick={ props.downloadCSV_wParams } disabled={props.disableDownloadButton}>Download {props.dataType}</Button>
                        <br></br>

                    </Card.Body>
                </Card>
            </div>

        </Col>

        <Col >
            <div className='chart' >

                <LineChart dataList={props.dataList} type={props.dataType} />
            </div>

        </Col>
    </Row>

  );
}

export default ExtractDownload
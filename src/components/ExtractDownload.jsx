import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
// import { ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LineChart from "./LineChart"
import './ExtractDownload.css';


function ExtractDownload (props) {

    console.log( "ExtractDownload component" );
    console.log( props );


  return (
    <Row className="app-container align-items-center">
        <Col md={6} id='todo_container' >

            {/* {props.extractStatus && <h2>Extracting {props.dataType}....</h2>}
            <h4>Number of Missing records for {props.dataType}: {props.missCount}</h4> */}

            {/* <button onClick={props.callExtractDataAPI} disabled={props.disableExtractButton}>Extract from data.gov.sg</button>
            <br></br>
            <button onClick={ props.downloadCSV_wParams } disabled={props.disableDownloadButton}>Download {props.dataType}</button>
            <br></br> */}
        

            <div className="" >
                <Card bg="light" className="my-3" >
                    <Card.Header><strong>{props.dataType}</strong></Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        <Card.Text>
                            {props.extractStatus && <h2>Extracting {props.dataType}....</h2>}
                            {/* Number of Missing records for {props.dataType}: {props.missCount}  */}
                            {props.extractStatus && <p>Number of Missing records for {props.dataType}: {props.missCount}</p> }
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                        <div>
                            <Button variant="primary" onClick={props.callExtractDataAPI} disabled={props.disableExtractButton}>Extract from data.gov.sg</Button>
                        </div>
                        <br></br>
                        <Button variant="primary" onClick={ props.downloadCSV_wParams } disabled={props.disableDownloadButton}>Download {props.dataType}</Button>
                        <br></br>

                        {/* <ButtonGroup aria-label="Basic example">
                            <div>
                                <Button variant="primary">Left</Button>
                                {' '}
                                <Button variant="primary">Middle</Button>
                            </div>
                        </ButtonGroup> */}

                    </Card.Body>
                </Card>
            </div>

        </Col>

        <Col >
            <div className='chart' >
                {/* windspeed  */}
                <LineChart dataList={props.dataList} type={props.dataType} />
            </div>

        </Col>
    </Row>

  );
}

export default ExtractDownload
//Segment.js

import React from 'react';
import { Form, Row, Col, Button,  } from 'react-bootstrap';

function Segment({ title, levelTexts = [], setTitle, setLevelTexts, addText, removeText, index, removeSegment }) {
    return (
      
        <div className="border rounded p-2 m-2">
         
            <Form>
                
                {levelTexts.map((level, i) => (
                    <div key={i}className = "border rounded p-2 m-2" >
                        <h5>Level {i + 1}</h5>
                        <Row >
                            {level.map((text, j) => (
                                <Col key={`${i}-${j}`} xs={12} md={12}>
                                    <Form.Group className="d-flex">
                                        <Form.Label className = "small">Text {j + 1}</Form.Label>
                                        <Form.Control as="textarea" rows={1} value={text} onChange={e => setLevelTexts(i, j, e.target.value, index)} />
                                        {level.length > 1 && <Button className="ml-1 badge text-bg-danger"  onClick={() => removeText(i, j, index)}>-</Button>}
                                    </Form.Group>
                                </Col>
                            ))}
                            <Col xs={12}>
                                <Button className="mt-1 badge text-bg-primary" variant="primary" onClick={() => addText(i, index)}>+</Button>
                            </Col>
                        </Row>
                    </div>
                ))}
               
            </Form>
        </div>

    );
}

export default Segment;

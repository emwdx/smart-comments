import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';
import Segment from './Segment';
import ReportView from './ReportView';
import SetupView from './SetupView';
import Footer from './Footer'
import CollectionsView from './CollectionsView'
import { Navbar, Nav } from 'react-bootstrap';
import './App.css'; 

function CommentGenerator() {

    //const [segments, setSegments] = useState([{ title: '', levelTexts: [[''], [''], ['']], level: 0 }]);
    const [segments, setSegments] = useState(null);
   
    const [activeCollection, setActiveCollection] = useState('');



    const updateActiveCollection = (collection) => {
      setActiveCollection(collection);
    };

    useEffect(() => {
      let loadedCollections = JSON.parse(localStorage.getItem('collections')) || [];
    
      // If no collections, create a new one named 'My Comments'
      if (Object.keys(loadedCollections).length === 0) {
        loadedCollections = {
          'My Comments': []
        };
        localStorage.setItem('collections', JSON.stringify(loadedCollections));
        updateActiveCollection("My Comments")
        
      }

    })
    
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg" className = "p-3">
      <Navbar.Brand href="#home">Smart Comments</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Collections</Nav.Link>
        <Nav.Link as={Link} to="/setup">Setup</Nav.Link>
          <Nav.Link as={Link} to="/reports">Report</Nav.Link>
          
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
    <Routes>
          <Route path="/setup" element={<SetupView 
    
            activeCollection={activeCollection} // Pass down activeCollection
            updateActiveCollection={updateActiveCollection} // Pass down updateActiveCollection function

          />} />
          <Route path="/reports" element={<ReportView 
            activeCollection={activeCollection} // Pass down activeCollection
            updateActiveCollection={updateActiveCollection} // Pass down updateActiveCollection function
          />} />
          <Route path = "/" element = {<CollectionsView
            activeCollection={activeCollection} // Pass down activeCollection
            updateActiveCollection={updateActiveCollection} // Pass down updateActiveCollection function
          />}/>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default CommentGenerator;


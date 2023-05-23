//CommentGenerator.js 

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';



import ReportView from './ReportView';
import SetupView from './SetupView';
import Footer from './Footer'
import CollectionsView from './CollectionsView'
import { Navbar, Nav } from 'react-bootstrap';
import './App.css'; 

function CommentGenerator() {

    //const [segments, setSegments] = useState([{ title: '', levelTexts: [[''], [''], ['']], level: 0 }]);
    //const [segments, setSegments] = useState(null);
   
    const [activeCollection, setActiveCollection] = useState('');
    const [isLoading, setIsLoading] = useState(true);



    const updateActiveCollection = (collection) => {
      setActiveCollection(collection);
    };

    useEffect(() => {
      let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};
      
      // If no collections, create a new one named 'My Comments'
      if (Object.keys(loadedCollections).length === 0) {
        loadedCollections = {
          'My Comments': []
        };
        localStorage.setItem('collections', JSON.stringify(loadedCollections));
        updateActiveCollection("My Comments");
      }
      if (loadedCollections && typeof loadedCollections === 'object') {
        const collectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
        //console.log("sorting array")
        collectionsArray.sort((a, b) => {
          if (a.name === activeCollection) {
            return -1;
          }
          if (b.name === activeCollection) {
            return 1;
          }
          // For non-active collections, sort alphabetically.
          return a.name.localeCompare(b.name);
        });
  
        //setCollections(collectionsArray);
        //console.log(collectionsArray)
        localStorage.setItem('collections', JSON.stringify(loadedCollections));
        //console.log(collectionsArray,collectionsArray[0].name)
        updateActiveCollection(collectionsArray[0].name);
        localStorage.setItem('segments', JSON.stringify(collectionsArray[0].segments));
      } else {
        console.log("special case");
      }
      
      setIsLoading(false);
    }, [activeCollection]);

    if (isLoading) {
      return <div>Loading...</div>; // or a loading spinner, etc.
    }
    
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg" className = "p-3">
      <Navbar.Brand href="/">Smart Comments<span className = "badge text-info">BETA</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Collections</Nav.Link>
        <Nav.Link as={Link} to="/setup">Setup</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          
          
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
          <Route path = "" element = {<CollectionsView
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


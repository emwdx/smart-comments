//CollectionsView.js

import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Modal, Row, Col, Badge, Dropdown, Form } from 'react-bootstrap';
import RenameModal from './RenameModal';
import DuplicateModal from './DuplicateModal';
import NewModal from './NewModal';
import WarningMessage from './CollectionWarning';
import saveAs from 'file-saver'

function CollectionsView({
  activeCollection, // Collect activeCollection prop
  updateActiveCollection // Collect updateActiveCollection prop
}) {
  const [collections, setCollections] = useState([]);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [currentCollectionName, setCurrentCollectionName] = useState('');
  const [activeSegments, setActiveSegments] = useState(JSON.parse(localStorage.getItem('segments')) || []);
  //const [showSaveModal, setShowSaveModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [importedCollectionText, setImportedCollection] = useState('');
  const [importedCollectionName, setImportedCollectionName] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [exportedCollectionName, setExportedCollectionName] = useState('');
  useEffect(() => {
    let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};

    if (activeSegments.length > 0 && !loadedCollections.hasOwnProperty('')) {
        loadedCollections[activeCollection] = activeSegments;
    }
    if (!loadedCollections.hasOwnProperty('My Comments') && Object.keys(loadedCollections).length === 0) {
      loadedCollections = {
        'My Comments': []
      };
      localStorage.setItem('collections', JSON.stringify(loadedCollections));
      localStorage.setItem('segments', JSON.stringify([]));
      

      //console.log("made new default collection")
    }

    //const loadedCollectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));

    // If activeCollection doesn't exist in the collections, set it to the first available collection
    /*
    if (!activeCollection || !loadedCollections.hasOwnProperty(activeCollection)) {
      const firstCollection = loadedCollectionsArray[0];
      updateActiveCollection(firstCollection.name);
      
      updateActiveCollectionSegments(firstCollection.segments); // Update active segments in local storage
    }
*/
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

      setCollections(collectionsArray);
      //console.log(collectionsArray)
    } else {
      console.log("special case");
    }
    
  }, [activeCollection]);

  useEffect(() => {
    //console.log(collections);
  }, [collections]);

  const updateActiveCollectionSegments = () => {
    if (!activeCollection) return; // Return if there is no active collection

    let collectionsObj = JSON.parse(localStorage.getItem('collections')) || {};

    // Update segments of active collection in local storage
    collectionsObj[activeCollection] = activeSegments;
    localStorage.setItem('collections', JSON.stringify(collectionsObj));
  }
/*
  const importActiveCollectionSegments = (textareaContent) => {
    if (!activeCollection) return; // Return if there is no active collection

    let collectionsObj = JSON.parse(localStorage.getItem('collections')) || {};

    // Parse the content of the textarea
    let updatedSegments;
    try {
      updatedSegments = JSON.parse(textareaContent);
    } catch (e) {
      console.error('Invalid JSON provided', e);
      return;
    }

    // Update segments of active collection in local storage
    collectionsObj[activeCollection] = updatedSegments;
    localStorage.setItem('collections', JSON.stringify(collectionsObj));
    localStorage.setItem('segments', JSON.stringify(updatedSegments));
  }
*/
  const importCollection = () => {
    let importedCollection;
    try {
      importedCollection = JSON.parse(importedCollectionText);
    } catch {
      alert("Invalid JSON");
      return;
    }

    let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};

    if (!importedCollectionName) { // Add this check
      alert("Collection name cannot be empty");
      return;
    }

    if (loadedCollections.hasOwnProperty(importedCollectionName)) { // Add this check
      alert("A collection with this name already exists.");
      return;
    }

    loadedCollections[importedCollectionName] = importedCollection;

    localStorage.setItem('collections', JSON.stringify(loadedCollections));
    localStorage.setItem('segments', JSON.stringify(importedCollection));

    updateActiveCollection(importedCollectionName);
    setActiveSegments(importedCollection); // Update active segments with imported collection's segments
    setImportedCollection('');
    setImportedCollectionName(''); // Reset the imported collection name
    setShowImportModal(false);
  };

  const exportCollection = () => {
    const loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};
    const collectionToExport = loadedCollections[exportedCollectionName];
    console.log("exporting name: ", exportedCollectionName, "to loaded collections ", loadedCollections)

    if (!collectionToExport) {
      alert("No collection found with that name");
      setExportedCollectionName(''); // clear exportedCollectionName state
      return;
    }

    const collectionToExportJSON = JSON.stringify(collectionToExport, null, 2); // stringify with formatting
    const blob = new Blob([collectionToExportJSON], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${exportedCollectionName}.txt`); // using FileSaver's saveAs function
    setExportedCollectionName(''); // clear exportedCollectionName state
  };
  useEffect(() => {
    if (exportedCollectionName !== '') {
      exportCollection();
    }
  }, [exportedCollectionName]);


  const openExportModal = (collectionName) => {
    setCurrentCollectionName(collectionName);
    setExportedCollectionName(collectionName);
  }

  // Function to handle selection from the dropdown
  const changeActiveCollection = (collectionName) => {
    updateActiveCollection(collectionName);
    // Load collections from localStorage
    let collectionsObj = JSON.parse(localStorage.getItem('collections')) || {};
    // Find the new active collection
    let selectedCollection = collections.find(collection => collection.name === collectionName);
    if(!selectedCollection){return}
    collectionsObj[collectionName] = selectedCollection.segments;

    // Convert the collections object back to an array and sort it.
    let collectionsArray = Object.entries(collectionsObj).map(([name, segments]) => ({ name, segments }));
    collectionsArray.sort((a, b) => {
      if (a.name === collectionName) {
        return -1;
      }
      if (b.name === collectionName) {
        return 1;
      }
      // For non-active collections, sort alphabetically.
      return a.name.localeCompare(b.name);
    });

    // Convert the sorted array back to an object and save it to localStorage.
    collectionsObj = collectionsArray.reduce((obj, collection) => {
      obj[collection.name] = collection.segments;
      return obj;
    }, {});

    localStorage.setItem('collections', JSON.stringify(collectionsObj));
    // Update active segments in state and localStorage
    setActiveSegments(selectedCollection.segments);
    localStorage.setItem('segments', JSON.stringify(selectedCollection.segments));
    
  };


  const openRenameModal = (collectionName) => {
    setCurrentCollectionName(collectionName);
    setNewCollectionName(collectionName)
    setShowRenameModal(true);
  }

  const closeRenameModal = () => {
    setCurrentCollectionName('');
    setNewCollectionName('');
    setShowRenameModal(false);
  }

  const renameCollection = () => {
    if (collections.find(collection => collection.name === newCollectionName)) {
      alert('A collection with this name already exists.');
    } else {
      // Rename the collection in localStorage
      const loadedCollections = JSON.parse(localStorage.getItem('collections'));
      loadedCollections[newCollectionName] = loadedCollections[currentCollectionName];
      delete loadedCollections[currentCollectionName];
      localStorage.setItem('collections', JSON.stringify(loadedCollections));

      // Update state
      const collectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
      setCollections(collectionsArray);
      // instead of setActiveCollection, you should call updateActiveCollection
      updateActiveCollection(newCollectionName);
    }
    closeRenameModal();
  }

  const openDuplicateModal = (collectionName) => {
    setCurrentCollectionName(collectionName);
    setShowDuplicateModal(true);
  }

  const closeDuplicateModal = () => {
    setCurrentCollectionName('');
    setNewCollectionName('');
    setShowDuplicateModal(false);
  }

  const duplicateCollection = () => {
    if (!newCollectionName.trim()) {
      alert("Collection name cannot be empty");
      return;
    }

    if (collections.find(collection => collection.name === newCollectionName)) {
      alert('A collection with this name already exists.');
    } else {
      // Duplicate the collection in localStorage
      const loadedCollections = JSON.parse(localStorage.getItem('collections'));
      loadedCollections[newCollectionName] = [...loadedCollections[currentCollectionName]];
      localStorage.setItem('collections', JSON.stringify(loadedCollections));

      // Update state
      const collectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
      setCollections(collectionsArray);
      // here, we update the active collection to the new duplicated collection
      updateActiveCollection(newCollectionName);
    }
    closeDuplicateModal();
  }

  const handleNewCollection = () => {
    if (!newCollectionName.trim()) {
      alert("Collection name cannot be empty");
      return;
    }
    const loadedCollections = JSON.parse(localStorage.getItem('collections'));
    if (loadedCollections.hasOwnProperty(newCollectionName)) {
      alert("A collection with this name already exists.");
      return;
    }

    loadedCollections[newCollectionName] = [];
    localStorage.setItem('collections', JSON.stringify(loadedCollections));

    const collectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
    setCollections(collectionsArray);
    // after creating a new collection, you might want to make it the active collection
    updateActiveCollection(newCollectionName);
    setActiveSegments([])
    setShowNewModal(false);
  };

  const deleteCollection = (collectionName) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      // Create a new collections object excluding the collection to be deleted
      const loadedCollections = JSON.parse(localStorage.getItem('collections'));
      delete loadedCollections[collectionName];

      // Update state and localStorage
      const collectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
      setCollections(collectionsArray);
      localStorage.setItem('collections', JSON.stringify(loadedCollections));

      if (collectionName === activeCollection) {
        const newActiveCollection = collectionsArray[0]?.name || null;
        updateActiveCollection(newActiveCollection);
        // Update active segments in state and localStorage
        const newActiveSegments = collectionsArray[0]?.segments || [];
        setActiveSegments(newActiveSegments);
        localStorage.setItem('segments', JSON.stringify(newActiveSegments));
      }
    }
  };



 

  const sortedCollections = [...collections].sort((a, b) => {
    if (a.name === activeCollection) {
      return -1;
    }
    if (b.name === activeCollection) {
      return 1;
    }
    // For non-active collections, sort alphabetically.
    return a.name.localeCompare(b.name);
  });


  return (
    <div>
      <WarningMessage></WarningMessage>
      <h2>Collections</h2>
      <Dropdown onSelect={changeActiveCollection}>
        <Dropdown.Toggle id="dropdown-basic">
          {activeCollection || "Select Active Collection"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {collections.map((collection, i) => (
            <Dropdown.Item eventKey={collection.name} key={i}>{collection.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {activeCollection ? (
        <p>Active collection: {activeCollection}</p>
      ) : (
        <p>No active collection.</p>
      )}
      {collections.length === 0 && (
        <p>No collections found.</p>
      )}
      {collections.map((collection, i) => (
        <ListGroup key={collection.name} className="mb-3">
          <ListGroup.Item variant="primary">
            <Row className="align-items-center">
              <Col>{collection.name}
                {collection.name === activeCollection && <Badge variant="success" className="ml-2 m-2">ACTIVE</Badge>}
              </Col>
              <Col>
                <div className="d-flex justify-content-center">
                  <Button variant="link" onClick={() => openRenameModal(collection.name)}>Rename</Button>
                  <Button variant="link" onClick={() => openDuplicateModal(collection.name)}>Duplicate</Button>
                  <Button variant="link" onClick={() => openExportModal(collection.name)}>Export</Button>

                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <Button variant="danger" size="sm" onClick={() => deleteCollection(collection.name)}>Delete</Button>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
          {collection.segments.map((segment, j) => (
            <ListGroup.Item key={j}>{segment.title}</ListGroup.Item>
          ))}
        </ListGroup>

      ))}
      <Button onClick={() => setShowNewModal(true)}>New Collection</Button>
      <Button onClick={() => setShowImportModal(true)}>Import Collection</Button>

      <RenameModal
        showRenameModal={showRenameModal}
        closeRenameModal={closeRenameModal}
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        renameCollection={renameCollection}
      />
      <DuplicateModal
        showDuplicateModal={showDuplicateModal}
        closeDuplicateModal={closeDuplicateModal}
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        duplicateCollection={duplicateCollection}
      />
      <NewModal
        showNewModal={showNewModal}
        setShowNewModal={setShowNewModal}
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        handleNewCollection={handleNewCollection}
      >
      </NewModal>

      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Enter Collection Name:</Form.Label> 
            <Form.Control
              type="text"
              value={importedCollectionName}
              onChange={e => setImportedCollectionName(e.target.value)}
            />
            <Form.Label className="mt-3">Paste text to import:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={importedCollectionText}
              onChange={e => setImportedCollection(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImportModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={importCollection}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CollectionsView;

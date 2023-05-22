// SetupView.js
import React, { useState , useEffect,useCallback } from 'react';
import { Button, Form, Modal, Accordion,} from 'react-bootstrap'; // Added Accordion and Card
import Segment from './Segment';
import { ArrowUp,ArrowDown,Trash } from 'react-bootstrap-icons';

function SetupView({ 
  activeCollection, // Collect activeCollection prop
  updateActiveCollection // Collect updateActiveCollection prop
}) {
    const [playgroundText, setPlaygroundText] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState('');
  const [segmentTitle, setSegmentTitle] = useState('');
  const [level, setLevel] = useState(1);
  const [collectionName, setCollectionName] = useState('');
  const [segments,setSegments] = useState(JSON.parse(localStorage.getItem('segments')) || [])

  const [savedCollections, setSavedCollections] = useState(JSON.parse(localStorage.getItem('collections')) || {});

const [collectionsLoaded, setCollectionsLoaded] = useState(false);

// New state for import modal
const [showImportModal, setShowImportModal] = useState(false);
const [importText, setImportText] = useState('');



const addSegment = () => {
  setSegments([...segments, { title: '', levelTexts: [[''], [''], ['']], level: 0 }]);
};

const removeSegment = (index) => {

  if (window.confirm('Are you sure you want to delete this segment?')) {
    setSegments(segments.filter((_, i) => i !== index));
    
  }

};

const setTitle = (newTitle, index) => {
const newSegments = [...segments];
newSegments[index].title = newTitle;
setSegments(newSegments);
};

const addText = (level, index) => {
const newSegments = [...segments];
newSegments[index].levelTexts[level].push('');
setSegments(newSegments);
};

const removeText = (level, textIndex, index) => {
const newSegments = [...segments];
newSegments[index].levelTexts[level] = newSegments[index].levelTexts[level].filter((_, i) => i !== textIndex);
setSegments(newSegments);
};

const setLevelTexts = (level, textIndex, newText, index) => {
const newSegments = [...segments];
newSegments[index].levelTexts[level][textIndex] = newText;
setSegments(newSegments);
};


  const handleTextSelection = (event) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setSelectedText(selectedText);
      setShowModal(true);
    }
  };

  useEffect(() => {
    // Load collections from local storage when the component mounts

    let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};

    
    // If no collections, create a new one named 'My Comments'
    if (Object.keys(loadedCollections).length === 0) {
      console.log("no length")
      loadedCollections = {
        'My Comments': []
      };
      localStorage.setItem('collections', JSON.stringify(loadedCollections));
      updateActiveCollection("My Comments")
    }
 
    setSavedCollections(savedCollections);
    setCollectionsLoaded(true);
}, []);


useEffect(() => {
  // Save segments to local storage whenever they change
  localStorage.setItem('segments', JSON.stringify(segments));

  // Also update the active collection in the saved collections
  if(activeCollection) {
    const updatedSavedCollections = {
      ...savedCollections,
      [activeCollection]: segments,
    };
    setSavedCollections(updatedSavedCollections);
    localStorage.setItem('collections', JSON.stringify(updatedSavedCollections));
  }
}, [segments, activeCollection]);


const constructPromptFromActiveCollection = useCallback(() => {
  // Convert your segments into a string representation
  const segmentsString = JSON.stringify(segments, null, 2);

  // Construct the full prompt
  const fullPrompt = `
    You are a teacher writing comments for reports in a ${activeCollection} class. 
    A comment generator you are using accepts arrays of objects like the one below. It consists of objects that contain titles for each sentence of the comment, 
    and an array of levelTexts that represent three different levels of comment for each title. The three arrays within levelTexts represent developing, proficient, 
    and exceeding comments. One array can have multiple texts that represent possible comments for the same level. The sentence structure of these comments for the same level should vary.

    For each object with a title, and for each level, you are to write three comments, store them in an array, and then store the array in the appropriate spot in levelTexts.

    These comments are going to be used for a range of students. Please use the following placeholders where needed in the comments:

    %nn - Name
    %sp - he, she, they
    %Sp - He, She, They
    %pp - his, her, their
    %Pp - His, Her, Their
    %hht - him, her, them

    Here is the structure of an array of objects. Your task is to make one for the course that has the titles within the array.

    ${segmentsString}
  `;

  // Return the full prompt
  return fullPrompt;
}, [activeCollection, segments]);

const importActiveCollectionSegments = () => {
  if (!activeCollection) return; // Return if there is no active collection

  let collectionsObj = JSON.parse(localStorage.getItem('collections')) || {};

  // Parse the content of the textarea
  let updatedSegments;
  try {
    updatedSegments = JSON.parse(importText);
  } catch (e) {
    console.error('Invalid JSON provided', e);
    return;
  }

  // Update segments of active collection in local storage
  collectionsObj[activeCollection] = updatedSegments;
  localStorage.setItem('collections', JSON.stringify(collectionsObj));
  localStorage.setItem('segments', JSON.stringify(updatedSegments));
  setSegments(updatedSegments); 

  // Clear the importText and close the modal
  setImportText('');
  setShowImportModal(false);
}

const copyPromptToClipboard = async () => {
  // Construct the prompt
  const prompt = constructPromptFromActiveCollection();

  // Use the navigator.clipboard API to copy the prompt to the clipboard
  try {
    await navigator.clipboard.writeText(prompt);
    console.log('Prompt copied to clipboard');
    setShowImportModal(true); // Show the import modal
  } catch (err) {
    console.error('Failed to copy prompt to clipboard', err);
  }
};

  const handleAddText = () => {
    // Check if the segment with the given title already exists
    const title = dropdownTitle === 'new' ? segmentTitle : dropdownTitle;
    const existingSegmentIndex = segments.findIndex(segment => segment.title === title);
    
    if (existingSegmentIndex !== -1) {
      // If the segment already exists, add the text to the appropriate level in that segment
      const newSegments = [...segments];
      newSegments[existingSegmentIndex].levelTexts[level - 1].push(selectedText);
      setSegments(newSegments);
    } else {
      // If the segment does not exist, create a new segment with that title and add the text to the appropriate level
      const newSegment = {
        title: title,
        levelTexts: [[], [], []],
        level: 0
      };
      newSegment.levelTexts[level - 1].push(selectedText);
      setSegments([...segments, newSegment]);
    }
    
    // After adding the text, close the modal and reset the selected text and segment title
    setShowModal(false);
    setSelectedText('');
    setSegmentTitle('');
    setDropdownTitle('');
  };
  
  const moveSegmentUp = (index,event) => {
    event.stopPropagation(); // prevent accordion from being affected
    if(index === 0) { // If it's the first item, it can't be moved up
        return;
    }
    const newSegments = [...segments];
    const temp = newSegments[index];
    newSegments[index] = newSegments[index - 1];
    newSegments[index - 1] = temp;
    setSegments(newSegments);
};

const moveSegmentDown = (index,event) => {
  event.stopPropagation(); // prevent accordion from being affected
    if(index === segments.length - 1) { // If it's the last item, it can't be moved down
        return;
    }
    const newSegments = [...segments];
    const temp = newSegments[index];
    newSegments[index] = newSegments[index + 1];
    newSegments[index + 1] = temp;
    setSegments(newSegments);
};


  return (
    <>
    

      <div className="p-3 mb-4 mt-4">
        <h4>Active Collection: {activeCollection}</h4>
        
      </div>

      <div className="bg-light p-3 mb-4 mt-4">
        <h4>Placeholder Text</h4>
        <p>
          <strong>%nn</strong> - Name <br/>
          <strong>%sp</strong> - he, she, they <br/>
          <strong>%Sp</strong> - He, She, They <br/>
          <strong>%pp</strong> - his, her, their <br/>
          <strong>%Pp</strong> - His, Her, Their <br/>
          <strong>%Hht</strong> - him, her, them <br/>
        </p>
      </div>
      <Form.Group className="mt-4">
    <Form.Label>Comment Playground</Form.Label>
    <Form.Control 
      as="textarea" 
      rows={3} 
      value={playgroundText} 
      onChange={e => setPlaygroundText(e.target.value)} 
      onMouseUp={handleTextSelection}
      placeholder="Use this space to build your comments."
      style={{fontSize: '1.5rem'}} 
      className = "m-4"
    />
</Form.Group>

<Accordion defaultActiveKey="0">
  {segments.map((segment, i) => (
    <Accordion.Item eventKey={i.toString()} key={i}>
      <Accordion.Header>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Trash 
      style={{ color: 'red', fontSize: '1.5em', marginRight: '10px' }} 
      onClick={() => removeSegment(i)}
    />
    <Form.Group controlId="title">
      <Form.Control 
        type="text"
        value={segment.title}
        onChange={(e) => setTitle(e.target.value, i)}
        placeholder="Title"
      />
    </Form.Group>
    <div style={{ display: 'flex', marginRight: '10px' , marginLeft:'10px'}}>
      <ArrowUp 
        style={{ fontSize: '1.5em', marginRight: '10px' }} 
        onClick={(event) => moveSegmentUp(i, event)}
      />
      <ArrowDown 
        style={{ fontSize: '1.5em' }} 
        onClick={(event) => moveSegmentDown(i, event)}
      />
    </div>
  </div>
</Accordion.Header>

      <Accordion.Body>
        <Segment 
          title={segment.title}
          levelTexts={segment.levelTexts}
          setTitle={setTitle}
          setLevelTexts={setLevelTexts}
          addText={addText}
          removeText={removeText}
          index={i}
          removeSegment={removeSegment}
        />
      </Accordion.Body>
    </Accordion.Item>
  ))}
</Accordion>


      <Button variant="primary" onClick={addSegment} className = "mt-3 mb-3">Add Segment</Button>
      <Button variant="success" onClick={copyPromptToClipboard} className = "mt-3 mb-3">GPT Prompt to Clipboard</Button>



     
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Text to Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected Text: {selectedText}</p>
          <Form>
          <Form.Group className="mb-3">
  <Form.Label>Segment Title</Form.Label>
  <div style={{ display: 'flex' }}>
    <Form.Select aria-label="Default select example" className="me-3" value={dropdownTitle} onChange={(e) => setDropdownTitle(e.target.value)}>
      <option>Select a title...</option>
      {segments.map((segment, i) => (
        <option key={i} value={segment.title}>{segment.title}</option>
      ))}
      <option value="new">New</option>
    </Form.Select>

    {dropdownTitle === 'new' && (
      <Form.Control type="text" placeholder="Enter new title" value={segmentTitle} onChange={(e) => setSegmentTitle(e.target.value)} />
    )}
    <Form.Group>
              <Form.Label>Level</Form.Label>
              <Form.Control as="select" value={level} onChange={e => setLevel(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Form.Control>
            </Form.Group>
  </div>
</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddText}>Add Text</Button>
        </Modal.Footer>
      </Modal>
     

      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Import AI Generated Comments</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div><strong>A prompt has been copied to the clipboard.</strong> 
      <p></p>
      <p>You can paste it into your favorite GPT. Feel free to edit the prompt text yourself to improve what it provides in the output.</p></div>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Paste the output from the GPT into the textarea below. <p></p>Note: this will replace all current segments with the AI generated collection. If you do not want this to occur, go to the 'Collections tab and import the AI generated comments as a new collection.</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={6}
                    placeholder="Paste text to import here"
                    value={importText}
                    onChange={e => setImportText(e.target.value)} 
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowImportModal(false)}>Close</Button>
        <Button variant="primary" onClick={importActiveCollectionSegments}>Import</Button>
    </Modal.Footer>
</Modal>
      
  </>
  
  );
}

export default SetupView;

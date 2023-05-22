// ReportView.js
import React, { useState, useEffect, }  from 'react';
import { Button, Form } from 'react-bootstrap';

function ReportView({  activeCollection, // Collect activeCollection prop
updateActiveCollection  }) {

  const [segments,setSegments] = useState(JSON.parse(localStorage.getItem('segments')) || []);
  const [name, setName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [finalComment, setFinalComment] = useState([]);
  

  useEffect(() => {
    let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};
  
    // If no collections, create a new one named 'My Comments'
    if (Object.keys(loadedCollections).length === 0) {
      loadedCollections = {
        'My Comments': []
      };
      localStorage.setItem('collections', JSON.stringify(loadedCollections));
      updateActiveCollection("My Comments")
    }
  
    const loadedCollectionsArray = Object.entries(loadedCollections).map(([name, segments]) => ({ name, segments }));
  
    // When the page first loads and activeCollection is null, set it to the key of any available collection
    if (!activeCollection && loadedCollectionsArray.length > 0) {
      updateActiveCollection(loadedCollectionsArray[0].name);
    }
  
  }, [activeCollection, updateActiveCollection]);  // Removed 'segments' from here
  
  useEffect(() => {
    let loadedCollections = JSON.parse(localStorage.getItem('collections')) || {};
    setSegments(loadedCollections[activeCollection] || []);
  }, [activeCollection]);  // This useEffect hook updates 'segments' when 'activeCollection' changes
  
  
  const formatCommentTextForClipboard = () => {
    const spReplacement = pronoun === 'they' ? 'they' : pronoun === 'he' ? 'he' : 'she';
    const ppReplacement = pronoun === 'they' ? 'their' : pronoun === 'he' ? 'his' : 'her';
    const hhtReplacement = pronoun === 'they' ? 'them' : pronoun === 'he' ? 'him' : 'her';
  
    return finalComment.map((commentSegment) => {
      return commentSegment.text
        .replace(/%nn/g, name)
        .replace(/\s*%Nn('?s)?/g, match => {
          if (match === "%Nn" || match === "%Nn's") {
            return capitalize(name) + match.slice(3);
          } else {
            return capitalize(name) + match.slice(4);
          }
        })
        .replace(/%sp/g, spReplacement)
        .replace(/%Sp/g, capitalize(spReplacement))
        .replace(/%pp/g, ppReplacement)
        .replace(/%Pp/g, capitalize(ppReplacement))
        .replace(/%hht/g, hhtReplacement);
    }).join(' ');
  };
  
  
    
    const copyToClipboard = () => {
      const textToCopy = formatCommentTextForClipboard();
      navigator.clipboard.writeText(textToCopy).then(function() {
        alert('Comment copied to clipboard!');
      }, function(err) {
        alert('Failed to copy text: ', err);
      });
    };

    const setLevel = (newLevel, index) => {
      const newSegments = [...segments];
      newSegments[index].level = newLevel;
      setSegments(newSegments);
      generateComment()
      };
      

      const updateText = (commentIndex) => {
        const commentSegment = finalComment[commentIndex];
        const levelTexts = segments[commentSegment.segmentIndex].levelTexts[commentSegment.level];
        const newTextIndex = (commentSegment.textIndex + 1) % levelTexts.length;
        const newComment = [...finalComment];
        newComment[commentIndex].text = levelTexts[newTextIndex];
        newComment[commentIndex].textIndex = newTextIndex;
        setFinalComment(newComment);
      }
    
      

    const generateComment = () => {
      /*
      const nameReplacement = name;
      const spReplacement = pronoun === 'they' ? 'they' : pronoun === 'he' ? 'he' : 'she';
      const ppReplacement = pronoun === 'they' ? 'their' : pronoun === 'he' ? 'his' : 'her';
      const hhtReplacement = pronoun === 'they' ? 'them' : pronoun === 'he' ? 'him' : 'her';
    */
      let newComment = segments.map((segment, i) => {
        const levelTexts = segment.levelTexts[segment.level];
        const textIndex = Math.floor(Math.random() * levelTexts.length);
        const text = levelTexts[textIndex] || "";  // Add empty string if no text exists
        return { text, segmentIndex: i, level: segment.level, textIndex };
      });
    
      setFinalComment(newComment);
    };
    
    const formatCommentText = () => {
      const spReplacement = pronoun === 'they' ? 'they' : pronoun === 'he' ? 'he' : 'she';
      const ppReplacement = pronoun === 'they' ? 'their' : pronoun === 'he' ? 'his' : 'her';
      const hhtReplacement = pronoun === 'they' ? 'them' : pronoun === 'he' ? 'him' : 'her';
      
      return finalComment.map((commentSegment, i) => {
        const text = commentSegment.text
        .replace(/%nn/g, name)
        .replace(/\s*%Nn('?s)?/g, match => {
          if (match === "%Nn" || match === "%Nn's") {
            return capitalize(name) + match.slice(3);
          } else {
            return capitalize(name) + match.slice(4);
          }
        })
        .replace(/%sp/g, spReplacement)
        .replace(/%Sp/g, capitalize(spReplacement))
        .replace(/%pp/g, ppReplacement)
        .replace(/%Pp/g, capitalize(ppReplacement))
        .replace(/%hht/g, hhtReplacement);
    
        return (
          <span 
            key={i} 
            style={{ margin: '0 5px' }} 
            onMouseEnter={(e) => e.target.style.border = '2px dotted red'} 
            onMouseLeave={(e) => e.target.style.border = ''}
            onClick={() => updateText(i)}
          >
            {text}
          </span>
        );
      });
    }
    
    const capitalize = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

      
      
  return (
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Pronoun</Form.Label>
        <Form.Control as="select" value={pronoun} onChange={e => setPronoun(e.target.value)}>
          <option value="">--Please choose an option--</option>
          <option value="he">He</option>
          <option value="she">She</option>
          <option value="they">They</option>
        </Form.Control>
      </Form.Group>

      <hr />

      {segments.map((segment, i) => (
        <Form.Group key={i}>
          <Form.Label>{segment.title}</Form.Label>
          <Form.Control as="select" value={segment.level} onChange={e => setLevel(Number(e.target.value), i)}>
            <option value="">--Please choose a level for {segment.title}--</option>
            <option value="0">Level 1</option>
            <option value="1">Level 2</option>
            <option value="2">Level 3</option>
          </Form.Control>
        </Form.Group>
      ))}

      <Button variant="primary" onClick={generateComment} className = "mt-3">Generate Comment</Button>
<Button variant="secondary" onClick={copyToClipboard} className = "mt-3 ml-3">Copy to Clipboard</Button>

      <Form.Group className="mt-3">
        <Form.Label>Final Comment</Form.Label>
        <div className="border p-3">
          {formatCommentText()}
        </div>
      </Form.Group>
    </Form>
  );
}

export default ReportView;

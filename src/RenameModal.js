import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function RenameModal({showRenameModal, closeRenameModal, newCollectionName, setNewCollectionName, renameCollection}) {

  
  return (
    <Modal show={showRenameModal} onHide={closeRenameModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} placeholder="New collection name" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeRenameModal}>
          Close
        </Button>
        <Button variant="primary" onClick={renameCollection}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RenameModal;

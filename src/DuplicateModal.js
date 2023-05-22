//DuplicateModal.js

import { Button, Modal } from 'react-bootstrap';

function DuplicateModal({ showDuplicateModal, closeDuplicateModal, newCollectionName, setNewCollectionName, duplicateCollection }) {
  return (
    <Modal show={showDuplicateModal} onHide={closeDuplicateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Duplicate Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} placeholder="New collection name" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDuplicateModal}>
          Close
        </Button>
        <Button variant="primary" onClick={duplicateCollection}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DuplicateModal;

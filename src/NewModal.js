import { Button, Modal } from 'react-bootstrap';

function NewModal({ showNewModal, setShowNewModal, newCollectionName, setNewCollectionName, handleNewCollection }) {
  return (
    <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>New Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} placeholder="Collection name" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowNewModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleNewCollection}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewModal;

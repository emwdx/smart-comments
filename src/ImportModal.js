import { Button, Modal } from 'react-bootstrap';


<Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Enter Collection Name:</Form.Label> {/* Add this section */}
            <Form.Control
              type="text"
              value={importedCollectionName}
              onChange={e => setImportedCollectionName(e.target.value)}
            />
            <Form.Label className="mt-3">Paste collection text:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={importedCollection}
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
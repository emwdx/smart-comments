import React from 'react';

const WarningMessage = () => {
  return (
    <div className="alert alert-warning rounded m-3">
      <h4 className="alert-heading">Please Note:</h4>
      <p>
        The comments you enter are stored locally in your browser. This means they will not be available if you use a different browser or clear your browser's cache.
      </p>
      <p className="mb-0">
        To make sure you don't lose your comments, please use the 'Export' feature for each of your collections. This will allow you to save your comments and use them on any browser or device, or as a backup in case your local browser data is cleared.
      </p>
    </div>
  );
};

export default WarningMessage;

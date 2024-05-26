import { useState, useRef, useCallback } from 'react';

function PasswordHistory({ password }) {
  const [history, setHistory] = useState(password);

  const copyPasswdToClipboard = useCallback(() => {
      window.navigator.clipboard.writeText(history);
    }
  , [history]);

  return (
    <div className="flex justify-between items-center shadow rounded-lg overflow-hidden border hover:border-white max-w-full p-1 my-1">
      <p className="overflow-hidden overflow-ellipsis flex-1 mr-2">
        <h1>{history}</h1>
      </p>
      <button className="hover:text-orange-500 text-orange-50" onClick={copyPasswdToClipboard}>
        <span className="material-symbols-outlined">content_copy</span>
      </button>
    </div>
  );
}

export default PasswordHistory;

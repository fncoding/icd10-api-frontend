import React, { useState, useCallback } from "react";

export default function DiagnosesSearch({ onSearch }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ searchCode: code, searchName: name });
    }
  };

  const handleClear = useCallback(() => {
    setCode("");
    setName("");
    if (onSearch) {
      onSearch({ searchCode: "", searchName: "" });
    }
  }, [onSearch]);

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-2">
        <input
          placeholder="ICD-Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="input input-info flex-1"
        />
        <input
          placeholder="Diagnose-Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input input-secondary flex-1"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-outline btn-primary">Suchen</button>
          <button type="button" onClick={handleClear} className="btn btn-outline">Zurücksetzen</button>
        </div>
      </form>
      {(code || name) && (
        <div className="text-sm text-base-content/70">
          Suche nach: {code && `Code: "${code}"`} {code && name && " UND "} {name && `Name: "${name}"`}
        </div>
      )}
    </div>
  );
}
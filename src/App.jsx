import React, { useEffect, useState } from "react";

const BASE =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/guests";

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data", data);
        setGuests(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch guests", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading guests...</p>;
  return (
    <div>
      <h1>Guest List</h1>
      {selectedGuest ? (
        <div>
          <h2>{selectedGuest.name}</h2>
          <p>Email: {selectedGuest.email}</p>
          <p>Phone: {selectedGuest.phone}</p>
          <p>Job: {selectedGuest.job}</p>
          <p>Bio: {selectedGuest.bio}</p>
          <button onClick={() => setSelectedGuest(null)}>Back</button>
        </div>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id} onClick={() => setSelectedGuest(guest)}>
              <strong>{guest.name}</strong> - {guest.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

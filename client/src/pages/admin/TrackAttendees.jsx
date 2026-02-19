import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const TrackAttendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [filterByEvent, setFilterByEvent] = useState('');
  const [searchByName, setSearchByName] = useState('');
  const [filterByAttendance, setFilterByAttendance] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5050/api';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [registrationsRes, eventsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/registrations`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/events`, { withCredentials: true }),
        ]);
        setAttendees(registrationsRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAttendance = async (attendeeId, currentStatus) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/registrations/mark-attendance/${attendeeId}`,
        { attended: !currentStatus },
        { withCredentials: true }
      );

      setAttendees((prev) =>
        prev.map((att) => (att._id === attendeeId ? { ...att, attended: !currentStatus } : att))
      );
    } catch (error) {
      console.error("Failed to update attendance", error);
      alert("Could not update attendance.");
    }
  };

  const filteredAttendees = attendees.filter((att) => {
    const name = att.name?.toLowerCase() || '';
    const matchesName = name.includes(searchByName.toLowerCase());
    const matchesEvent = filterByEvent === '' || att.event_id === filterByEvent;
    const matchesAttendance =
      filterByAttendance === 'all' ||
      (filterByAttendance === 'attended' && att.attended === true) ||
      (filterByAttendance === 'not_attended' && (!att.attended || att.attended === false));

    return matchesName && matchesEvent && matchesAttendance;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header pageTitle="Track Attendees" />
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-4 flex-wrap gap-y-2">
              <select
                value={filterByEvent}
                onChange={(e) => setFilterByEvent(e.target.value)}
                className="min-w-[150px] px-4 py-2 border rounded"
              >
                <option value="">Filter by Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </select>

              <select
                value={filterByAttendance}
                onChange={(e) => setFilterByAttendance(e.target.value)}
                className="min-w-[150px] px-4 py-2 border rounded"
              >
                <option value="all">All</option>
                <option value="attended">Attended</option>
                <option value="not_attended">Not Attended</option>
              </select>

              <input
                type="text"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
                placeholder="Search by Name"
                className="min-w-[200px] px-4 py-2 border rounded-full"
              />
            </div>
          </div>

          {loading && <p className="text-center">Loading attendees...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && filteredAttendees.length === 0 && (
            <p className="text-center text-gray-500">No attendees found.</p>
          )}

          {!loading && !error && filteredAttendees.length > 0 && (
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAttendees.map((att) => (
                    <tr key={att._id}>
                      <td className="px-6 py-4">{att.name || 'N/A'}</td>
                      <td className="px-6 py-4">{att.email || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {events.find((e) => e._id === att.event_id)?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {att.attended ? 'Attended' : 'Not Attended'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleAttendance(att._id, att.attended)}
                          className={`px-4 py-1 rounded ${
                            att.attended
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {att.attended ? 'Mark as Not Attended' : 'Mark as Attended'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TrackAttendees;

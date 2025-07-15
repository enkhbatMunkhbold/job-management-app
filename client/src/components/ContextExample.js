import { useContext } from 'react';
import UserContext from '../context/UserContext';
import JobsContext from '../context/JobsContext';
import ClientsContext from '../context/ClientsContext';

const ContextExample = () => {
  const { user } = useContext(UserContext);
  const { jobs, isLoading: jobsLoading, fetchJobs } = useContext(JobsContext);
  const { clients, isLoading: clientsLoading, fetchClients } = useContext(ClientsContext);

  const handleRefreshData = () => {
    fetchJobs();
    fetchClients();
  };

  if (jobsLoading || clientsLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Context Usage Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>User Information</h3>
        <p>Welcome, {user?.username}!</p>
        <p>Email: {user?.email}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Jobs ({jobs.length})</h3>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map(job => (
              <li key={job.id}>
                <strong>{job.title}</strong> - {job.category}
                <br />
                <small>{job.description}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Clients ({clients.length})</h3>
        {clients.length > 0 ? (
          <ul>
            {clients.map(client => (
              <li key={client.id}>
                <strong>{client.name}</strong> - {client.email}
                <br />
                <small>{client.company}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No clients found.</p>
        )}
      </div>

      <button onClick={handleRefreshData} style={{ padding: '10px 20px' }}>
        Refresh Data
      </button>
    </div>
  );
};

export default ContextExample; 
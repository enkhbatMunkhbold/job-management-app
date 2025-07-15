import { createContext, useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

const ClientsContext = createContext(null);

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/clients', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const clientsData = await response.json();
        setClients(clientsData);
      } else {
        console.error('Failed to fetch clients:', response.statusText);
        setClients([]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createClient = async (clientData) => {
    try {
      const response = await fetch('/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(clientData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create client');
      }

      const newClient = await response.json();
      setClients(prevClients => [...prevClients, newClient]);
      return newClient;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(`/clients/${clientId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete client');
      }

      setClients(prevClients => prevClients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchClients();
    } else {
      setClients([]);
      setIsLoading(false);
    }
  }, [user]);

  const value = {
    clients,
    setClients,
    isLoading,
    fetchClients,
    createClient,
    deleteClient
  };

  return (
    <ClientsContext.Provider value={value}>
      {children}
    </ClientsContext.Provider>
  );
};

export default ClientsContext; 
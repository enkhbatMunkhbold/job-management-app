# Context Usage Guide

This guide explains how to use the `JobsContext` and `ClientsContext` in your React components.

## Overview

The application uses React Context API to manage global state for:
- **UserContext**: Manages user authentication and session
- **JobsContext**: Manages jobs data and operations
- **ClientsContext**: Manages clients data and operations

## Context Providers Setup

The contexts are set up in `App.js` with the following hierarchy:

```jsx
<UserProvider>
  <JobsProvider>
    <ClientsProvider>
      <AppContent />
    </ClientsProvider>
  </JobsProvider>
</UserProvider>
```

## JobsContext Usage

### Import and Use

```jsx
import { useContext } from 'react';
import JobsContext from '../context/JobsContext';

const MyComponent = () => {
  const { 
    jobs, 
    isLoading, 
    fetchJobs, 
    createJob, 
    deleteJob, 
    getJobById 
  } = useContext(JobsContext);

  // Your component logic here
};
```

### Available Properties and Methods

| Property/Method | Type | Description |
|----------------|------|-------------|
| `jobs` | Array | Array of all jobs |
| `isLoading` | Boolean | Loading state for jobs |
| `fetchJobs()` | Function | Fetches all jobs from the server |
| `createJob(jobData)` | Function | Creates a new job |
| `deleteJob(jobId)` | Function | Deletes a job by ID |
| `getJobById(jobId)` | Function | Gets a specific job by ID |

### Example: Creating a Job

```jsx
const { createJob } = useContext(JobsContext);

const handleCreateJob = async (jobData) => {
  try {
    const newJob = await createJob({
      title: "Web Development",
      category: "Technology",
      description: "Full-stack web development",
      duration: "2 weeks"
    });
    console.log('Job created:', newJob);
  } catch (error) {
    console.error('Failed to create job:', error);
  }
};
```

### Example: Deleting a Job

```jsx
const { deleteJob } = useContext(JobsContext);

const handleDeleteJob = async (jobId) => {
  try {
    await deleteJob(jobId);
    console.log('Job deleted successfully');
  } catch (error) {
    console.error('Failed to delete job:', error);
  }
};
```

## ClientsContext Usage

### Import and Use

```jsx
import { useContext } from 'react';
import ClientsContext from '../context/ClientsContext';

const MyComponent = () => {
  const { 
    clients, 
    isLoading, 
    fetchClients, 
    createClient, 
    deleteClient, 
    getClientById,
    getClientOrders 
  } = useContext(ClientsContext);

  // Your component logic here
};
```

### Available Properties and Methods

| Property/Method | Type | Description |
|----------------|------|-------------|
| `clients` | Array | Array of all clients |
| `isLoading` | Boolean | Loading state for clients |
| `fetchClients()` | Function | Fetches all clients from the server |
| `createClient(clientData)` | Function | Creates a new client |
| `deleteClient(clientId)` | Function | Deletes a client by ID |
| `getClientById(clientId)` | Function | Gets a specific client by ID |
| `getClientOrders(clientId)` | Function | Gets orders for a specific client |

### Example: Creating a Client

```jsx
const { createClient } = useContext(ClientsContext);

const handleCreateClient = async (clientData) => {
  try {
    const newClient = await createClient({
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      company: "ABC Corp",
      address: "123 Main St",
      notes: "Important client with ongoing projects"
    });
    console.log('Client created:', newClient);
  } catch (error) {
    console.error('Failed to create client:', error);
  }
};
```

### Example: Getting Client Orders

```jsx
const { getClientOrders } = useContext(ClientsContext);

const handleGetClientOrders = async (clientId) => {
  try {
    const ordersData = await getClientOrders(clientId);
    console.log('Client orders:', ordersData);
  } catch (error) {
    console.error('Failed to get client orders:', error);
  }
};
```

## Using Multiple Contexts Together

You can use multiple contexts in the same component:

```jsx
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import JobsContext from '../context/JobsContext';
import ClientsContext from '../context/ClientsContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { jobs, isLoading: jobsLoading } = useContext(JobsContext);
  const { clients, isLoading: clientsLoading } = useContext(ClientsContext);

  if (jobsLoading || clientsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <p>You have {jobs.length} jobs and {clients.length} clients.</p>
      
      {/* Your dashboard content */}
    </div>
  );
};
```

## Error Handling

All context methods include proper error handling. Always wrap context method calls in try-catch blocks:

```jsx
const { createJob } = useContext(JobsContext);

const handleSubmit = async (formData) => {
  try {
    await createJob(formData);
    // Success handling
  } catch (error) {
    // Error handling
    console.error('Error:', error.message);
    alert('Failed to create job: ' + error.message);
  }
};
```

## Loading States

Use the `isLoading` properties to show loading indicators:

```jsx
const { jobs, isLoading } = useContext(JobsContext);

if (isLoading) {
  return <div>Loading jobs...</div>;
}

return (
  <div>
    {jobs.map(job => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);
```

## Best Practices

1. **Always handle errors**: Wrap context method calls in try-catch blocks
2. **Use loading states**: Show loading indicators when `isLoading` is true
3. **Check for user authentication**: Ensure user is logged in before making requests
4. **Update local state**: The contexts automatically update their internal state after operations
5. **Avoid unnecessary re-renders**: Only destructure the context values you need

## API Endpoints

The contexts interact with these backend endpoints:

### Jobs
- `GET /jobs` - Fetch all jobs
- `POST /jobs` - Create a new job
- `GET /jobs/:id` - Get a specific job
- `DELETE /jobs/:id` - Delete a job

### Clients
- `GET /clients` - Fetch user's clients
- `POST /clients` - Create a new client
- `GET /clients/:id` - Get a specific client
- `DELETE /clients/:id` - Delete a client
- `GET /clients/:id/orders` - Get client's orders 
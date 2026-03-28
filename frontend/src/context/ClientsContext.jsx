import { createContext, useContext, useMemo, useState } from "react";
import { initialClients } from "../data/clients";

const ClientsContext = createContext(null);

function createClientId() {
  return `client-${Date.now()}`;
}

function withSafeArrays(client) {
  return {
    projects: [],
    domains: [],
    credentials: [],
    billing: [],
    noteTimeline: [],
    ...client,
  };
}

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState(initialClients.map(withSafeArrays));

  const addClient = (clientPayload) => {
    const newClient = withSafeArrays({
      id: createClientId(),
      ...clientPayload,
    });

    setClients((previousClients) => [newClient, ...previousClients]);
    return newClient;
  };

  const updateClient = (clientId, clientPayload) => {
    let updatedClient = null;

    setClients((previousClients) =>
      previousClients.map((client) => {
        if (client.id !== clientId) {
          return client;
        }

        updatedClient = withSafeArrays({
          ...client,
          ...clientPayload,
        });

        return updatedClient;
      }),
    );

    return updatedClient;
  };

  const deleteClient = (clientId) => {
    setClients((previousClients) => previousClients.filter((client) => client.id !== clientId));
  };

  const getClientById = (clientId) => clients.find((client) => client.id === clientId) || null;

  const value = useMemo(
    () => ({
      clients,
      addClient,
      updateClient,
      deleteClient,
      getClientById,
    }),
    [clients],
  );

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients() {
  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }

  return context;
}

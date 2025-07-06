import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'

const API_URL = import.meta.env.VITE_API_URL as string

const cache = new InMemoryCache();

async function setupApolloCacheAndRender() {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage)
  });

  const client = new ApolloClient({
    uri: API_URL + '/graphql',
    cache,
  })

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>,
  )
}

setupApolloCacheAndRender();
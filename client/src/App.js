import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import DeckEdit from './pages/DeckEditPage';
import CardPage from './pages/CardPage';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home.js';
import Login from './components/Login/LoginStyles/Login'
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import PaypalHomePage from './PaypalHomePage';
import Contact from './components/Contact/Contact'


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path="/saved/:deckId/edit"
              element={<DeckEdit />}
            />
            <Route
              path="/saved/:deckId"
              element={<CardPage />}
            />
            <Route
              path="/main"
              element={<MainPage />}
            />
            <Route
              path="/userPage"
              element={<UserPage />}
            />
            <Route path='/supportUs' element={<PaypalHomePage />} />
            <Route
              path='*'
              element={<h1 className="display-2">Wrong page!</h1>}
            />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Contact' element={<Contact />}/>
          </Routes>

        </>
      </Router>
    </ApolloProvider>
  );
}
export default App;

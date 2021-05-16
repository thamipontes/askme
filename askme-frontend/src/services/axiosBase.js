import axios from 'axios';
import TokenService from './token.service';
import ReactDOM from 'react-dom';
import ErrorMessageComponent from './errorMessage';
import React from 'react';

let messageIndex = 0;

const showError = (message) => {
  messageIndex ++;
  ReactDOM.render(
      <ErrorMessageComponent
        message={message}
        key={messageIndex} />, document.getElementById('messages'));
};

const API = axios.create({
  baseURL: `http://localhost:4000/`,
});

API.interceptors.request.use(function(config) {
  const token = TokenService.getAuthToken();
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

API.interceptors.response.use((response) => {
  return response;
},
(err) => {
  showError(err.response.data.message);

  return Promise.reject(err);
});

export default API;

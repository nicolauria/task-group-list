import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import Tasks from './tasks-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root tasks={Tasks}/>, root);
});

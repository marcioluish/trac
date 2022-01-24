import React, { createContext } from 'react';

import openSocket from 'socket.io-client';

export const socket = openSocket('http://localhost:8000');
export const SocketContext = createContext(socket);

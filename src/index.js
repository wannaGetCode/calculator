import React from "react";
import ReactDOMClient from 'react-dom/client'

import Calculator from './Calculator'
import './index.css'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)

root.render(<Calculator />)
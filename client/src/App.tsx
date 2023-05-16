import React from 'react'
import { InvoiceDetailsPage } from './pages/invoice-page'

// Usually it should have router and details page should use id from url
// here im use hardcoded id only for simplification
function App () {
  return (
    <div className="App">
      <InvoiceDetailsPage/>
    </div>
  )
}

export default App

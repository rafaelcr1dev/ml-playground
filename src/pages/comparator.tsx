import React from 'react';

import { ComparatorProvider } from '../hooks'
import ComparatorComponent from '../components/Comparator'

export default function Comparator() {
  return (
    <ComparatorProvider query={{}}>
      <ComparatorComponent />
    </ComparatorProvider>
  )
}

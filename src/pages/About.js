import React from 'react';

// bad syntax to test linters
var a = 3
export function About() {
  return (
    <>
      <h1 data-testid="page-title">About</h1>
      <p>This is an example application.</p>
    </>
  );
}

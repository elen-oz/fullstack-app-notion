import { useState } from 'react';

// Copy the payload shape interface from our server
// We want to copy (rather than import) since we we won't necessarily deploy our
// front end and back end to the same place
interface Projects {
  title: string;
  url: string;
  description: string;
  github: string;
}

function App() {
  // A state value will store the current state of the array of data which can be updated
  // by editing your database in Notion and then pressing the fetch button again
  const [thingsToLearn, setThingsToLearn] = useState<Projects[]>([]);

  return (
    <div>
      <h1>Things to Learn</h1>
      <button
        type='button'
        onClick={() => {
          fetch('http://localhost:8000/')
            .then((response) => response.json())
            .then((payload) => {
              // Set the React state with the array response
              setThingsToLearn(payload);
            });
        }}
      >
        Fetch List
      </button>

      {/* Map the resulting object array into an ordered HTML list with anchor links */}
      {/* Using index as key is harmless since we will only ever be replacing the full list */}
      <ol>
        {thingsToLearn.map((thing, idx) => {
          return (
            <li key={idx}>
              <span>Title: {thing.title}</span>{' '}
              <a href={thing.url} target='_blank' rel='noopener noreferrer'>
                {thing.url}
              </a>
              <div>{thing.description}</div>
              <span>
                Github:{' '}
                <a
                  href={thing.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {thing.github}
                </a>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;

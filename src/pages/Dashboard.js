import { useState } from 'react';
import styles from '../styles/pages/Dashboard.module.css';
import React from 'react';
const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');

  function formatResponseText(text) {
    // Replace bold markers (**) with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Replace heading markers (***) with <h3><strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<h3><strong>$1</strong></h3>');
  
    // Replace bullet points markers (*) with unordered list (<ul>) and list items (<li>)
    text = text.replace(/\*(.*?)\*/g, '<ul><li>$1</li></ul>');
  
    return text;
  }
  

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://n8n-dev.subspace.money/webhook-test/20ffd5f2-4515-47f7-8455-3f062ff91fe4', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data && data.length > 0 && data[0].choices && data[0].choices[0].message) {
        const content = data[0].choices[0].message.content;
        // Convert newline characters to <br /> tags
        setResponse(formatResponseText(content));
      } else {
        setResponse('The server limit Completed');
      }
    } catch (error) {
      setResponse('Error fetching response.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>YouTube Summarize</div>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className={styles.input}
      />
      
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>

      {response && (
        <p
          className={styles.response}
          dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }}
        />
      )}
    </div>
  );
};

export default Dashboard;

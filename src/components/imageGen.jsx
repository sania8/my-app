import React, { useState } from "react";
import Api from './api';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 30,
    width: 200,
    marginRight: 10,
    padding: 5,
    fontSize: 16,
  },
  button: {
    height: 40,
    width: 120,
    backgroundColor: 'lightblue',
    color: 'white',
    fontSize: 16,
    borderRadius: 5,
    border: 'none',
    cursor: 'pointer',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    objectFit: 'contain',
  },
};

const ImageGenerator = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Api}`
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    const blob = await res.blob();
    setImage(URL.createObjectURL(blob));
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Generate Image
        </button>
      </form>
      {image && (
        <div style={styles.imageContainer}>
          <img src={image} style={styles.image} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;

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
  const handleDownload = () => {
    if(!image) return ;
    const a = document.createElement("a");
    a.href = image;
    a.download = "image.png";
    a.click();
  };

  return (
    
    <div className='container al-c'>
      <div class="style">
      <h1>Stable Diffusion</h1>
      </div>
     
      <form onSubmit={handleSubmit} classNmae="gen-form">
        <input
          type="text"
          class="style2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        
          placeholder="Write your prompt here"
        />
        <button type="submit"  class="submit">
          Generate Image
        </button>
      </form>
      {image && (<>
        <div className='result-image'>
          <img src={image} style={styles.image} alt="Generated" />
        </div>
        <button onClick={handleDownload} class="submit">
          Download Image
        </button>
        </>)}
    </div>
  );
};

export default ImageGenerator;

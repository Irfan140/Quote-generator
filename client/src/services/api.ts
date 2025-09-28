const url = 'https://quote-generator-oczp.onrender.com/quote';

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result; // { content, author }
  } catch (error: any) {
    console.error(error.message);
    return { content: 'Error fetching quote', author: '' };
  }
}

export default getData;

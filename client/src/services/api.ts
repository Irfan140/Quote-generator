const url = 'http://192.168.1.69:5000/quote';

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

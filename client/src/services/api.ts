const url = 'https://quote-generator-oczp.onrender.com/quote';

async function getData(animeName: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ anime: animeName }), // send anime name in JSON
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result; // { quote }
  } catch (error: any) {
    console.error(error.message);
    return { quote: 'Error fetching quote' };
  }
}

export default getData;

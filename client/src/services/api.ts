const url = 'https://quote-generator-oczp.onrender.com/quote';

async function getData(topic_name: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: topic_name }), // send topic_name in JSON format
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result; // { author, quote }
  } catch (error: any) {
    console.error(error.message);
    return { quote: 'Error fetching quote' };
  }
}

export default getData;

from flask import Flask, jsonify, request

import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

load_dotenv()


llm = ChatGroq(
    model="deepseek-r1-distill-llama-70b",  
    temperature=0,                          # Controls randomness (0 = deterministic)
    max_tokens=None,                        # Maximum tokens in the response (None = default)
    reasoning_format="parsed",              # Output reasoning in structured (parsed) form
    timeout=None,                           # How long to wait before request times out (in seconds)
    max_retries=2,                          # Retry failed requests up to 2 times
    # other params...                       # You can pass extra kwargs depending on API
)

    


app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask Quote API is running"})



@app.route("/quote", methods=["POST"])
def get_quote():
    try:
        data = request.get_json()  # Get JSON body
        if not data or "anime" not in data:
            return jsonify({"error": "Please provide 'anime' in JSON body"}), 400

        anime_name = data["anime"]

        # Prepare the prompt template
        prompt_template = PromptTemplate.from_template(
            "Give me a quote from the anime {anime}. Just give the sentence of the quote and the author that said it."
        )

        # Create LangChain chain
        chain = prompt_template | llm

        # Invoke the chain with dynamic anime name
        ai_msg = chain.invoke({"anime": anime_name})

        return jsonify({"quote": ai_msg.content}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
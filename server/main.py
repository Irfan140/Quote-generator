from flask import Flask, jsonify, request

import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

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
        if not data or "topic" not in data:
            return jsonify({"error": "Please provide 'topic' in JSON body"}), 400

        topic_name = data["topic"]

        # Define schema
        response_schemas = [
            ResponseSchema(name="quote", description="The quote text from the given topic"),
            ResponseSchema(name="author", description="The name of the author or character of the quote")
        ]

        # Create output parser
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        # Prompt
        prompt_template = ChatPromptTemplate.from_messages([
            ("system", "You are a helpful assistant that gives quotes about any topic. It may be a movie, series, historical leader, manga or manhwa.If you cannot find just tell NOT FOUND"),
            ("user", "Tell me a quote from {topic}.\n{format_instructions}")
        ])

        # Chain
        chain = prompt_template | llm

        # Get response from LLM
        ai_msg = chain.invoke({"topic": topic_name, "format_instructions": format_instructions})

        # Parse model output into dict
        parsed_output = output_parser.parse(ai_msg.content)

        return jsonify(parsed_output), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
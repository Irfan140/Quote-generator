from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask Quote API is running"})

@app.route("/quote", methods=["GET"])
def get_quote():
    try:
        # Call external random quote API
        response = requests.get("https://api.quotable.io/random", timeout=5, verify=False)
        data = response.json()

        # Extract only what we need
        quote = {
            "content": data.get("content", "No quote available"),
            "author": data.get("author", "Unknown")
        }

        return jsonify(quote), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

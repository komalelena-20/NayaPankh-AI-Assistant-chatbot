from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Gemini API Configuration
genai.configure(api_key="enter ur API")

# Gemini Model
model = genai.GenerativeModel("gemini-2.0-flash")

# Home Page
@app.route("/")
def home():
    return render_template("index.html")

# Chat Route
@app.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json()

        user_message = data["message"]

        response = model.generate_content(user_message)

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        print("GEMINI ERROR:", e)

        return jsonify({
            "reply": "⚠️ Gemini API limit reached. Please try again later."
        })
# Run Flask App
if __name__ == "__main__":
    app.run(debug=True)
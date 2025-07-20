from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import os

app = Flask(__name__)

# Load and parse your portfolio content
URL = "https://rohitkumar77.netlify.app"
response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")
content = soup.get_text(separator="\n", strip=True)

section_keywords = {
    "projects": ["project", "projects"],
    "skills": ["skill", "skills"],
    "education": ["education", "qualification", "degree"],
    "experience": ["experience", "work"],
    "contact": ["contact", "email", "phone"]
}

gemini_model = OpenAI(
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
    api_key=os.environ.get("GEMINI_API_KEY")
)

def extract_section(query):
    query_lower = query.lower()
    for section, keywords in section_keywords.items():
        if any(k in query_lower for k in keywords):
            lines = content.splitlines()
            for i, line in enumerate(lines):
                if section in line.lower():
                    extracted = [line]
                    for j in range(i+1, min(i+10, len(lines))):
                        if lines[j].strip() == "":
                            break
                        extracted.append(lines[j])
                    return "\n".join(extracted)
    return None

def ask_gemini(userprompt):
    messages = [
        {"role": "system", "content": f"You are a helpful assistant for Rohit Kumar's DevOps portfolio... {content}"},
        {"role": "user", "content": userprompt}
    ]
    completion = gemini_model.chat.completions.create(
        model="gemini-2.5-flash",
        messages=messages
    )
    return completion.choices[0].message.content

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_prompt = data.get("message", "")
    section = extract_section(user_prompt)
    if section:
        return jsonify({"response": section})
    else:
        return jsonify({"response": ask_gemini(user_prompt)})

if __name__ == "__main__":
    app.run(debug=True) 
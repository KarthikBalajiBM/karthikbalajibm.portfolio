from flask import Flask, render_template, request, jsonify, send_file
import os
import json

app = Flask(__name__)

# Load portfolio data from JSON file
def load_portfolio_data():
    data_file = os.path.join(os.path.dirname(__file__), 'static', 'data', 'portfolio_data.json')
    try:
        with open(data_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Return default data if file doesn't exist
        return {
            "name": "Karthik Balaji B M",
            "title": "Software Engineer",
            "about": "Passionate software engineer with expertise in machine learning and web development.",
            "skills": [],
            "experience": [],
            "education": [],
            "projects": [],
            "contact": {
                "email": "",
                "phone": "",
                "linkedin": "",
                "github": ""
            }
        }

# Routes
@app.route('/')
def index():
    portfolio_data = load_portfolio_data()
    return render_template('index.html', data=portfolio_data)

@app.route('/about')
def about():
    portfolio_data = load_portfolio_data()
    return render_template('about.html', data=portfolio_data)

@app.route('/projects')
def projects():
    portfolio_data = load_portfolio_data()
    return render_template('projects.html', data=portfolio_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle contact form submission
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        # In a real application, you would save this to a database or send an email
        return jsonify({"success": True, "message": "Message sent successfully!"})
    
    portfolio_data = load_portfolio_data()
    return render_template('contact.html', data=portfolio_data)

@app.route('/resume')
def resume():
    portfolio_data = load_portfolio_data()
    return render_template('resume.html', data=portfolio_data)

@app.route('/download-resume')
def download_resume():
    # Path to the resume file
    resume_path = os.path.join(os.path.dirname(__file__), 'static', 'files', 'Karthik_Balaji_Resume.pdf')
    # Check if the file exists, if not, return a 404
    if not os.path.exists(resume_path):
        return "Resume file not found", 404
    # Return the file as an attachment
    return send_file(resume_path, as_attachment=True, download_name='Karthik_Balaji_Resume.pdf')

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs(os.path.join(os.path.dirname(__file__), 'static', 'data'), exist_ok=True)
    app.run(debug=True)

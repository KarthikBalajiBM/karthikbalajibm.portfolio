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

@app.route('/contact')
def contact():
    portfolio_data = load_portfolio_data()
    return render_template('contact.html', data=portfolio_data)

@app.route('/resume')
def resume():
    portfolio_data = load_portfolio_data()
    return render_template('resume.html', data=portfolio_data)

@app.route('/download-resume')
def download_resume():
    # Try different resume file locations in order
    resume_files = [
        os.path.join(os.path.dirname(__file__), 'static', 'files', 'Resume_Karthik_Balaji_B_M.pdf'),
        os.path.join(os.path.dirname(__file__), 'static', 'files', 'Karthik_Balaji_Resume.pdf')
    ]
    
    # Try each resume file location
    for resume_path in resume_files:
        if os.path.exists(resume_path):
            try:
                return send_file(
                    resume_path,
                    as_attachment=True,
                    download_name='Karthik_Balaji_Resume.pdf',
                    mimetype='application/pdf'
                )
            except Exception as e:
                print(f"Error sending file: {e}")
                return f"Error downloading resume: {str(e)}", 500
    
    # If no resume file is found
    print("Resume file not found in any of the expected locations")
    return "Resume file not found", 404

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs(os.path.join(os.path.dirname(__file__), 'static', 'data'), exist_ok=True)
    app.run(debug=True)

# Karthik Balaji - Portfolio Website

A modern, responsive portfolio website built with Flask and a clean, eye-catching frontend design.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Sections for showcasing skills, projects, experience, and education
- Contact form for potential clients or employers to get in touch
- Resume page with downloadable PDF option

## Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML, CSS, JavaScript
- **Dependencies**: See requirements.txt

## Setup Instructions

1. Clone the repository:
```
git clone https://github.com/yourusername/karthik-portfolio.git
cd karthik-portfolio
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```
venv\Scripts\activate
```
- macOS/Linux:
```
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Run the application:
```
python app.py
```

6. Open your browser and navigate to:
```
http://127.0.0.1:5000/
```

## Project Structure

```
karthik-portfolio/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── static/                 # Static files
│   ├── css/                # CSS stylesheets
│   ├── js/                 # JavaScript files
│   ├── images/             # Image files
│   └── data/               # JSON data files
└── templates/              # HTML templates
    ├── base.html           # Base template
    ├── index.html          # Home page
    ├── about.html          # About page
    ├── projects.html       # Projects page
    ├── resume.html         # Resume page
    └── contact.html        # Contact page
```

## Customization

1. Update your personal information in `static/data/portfolio_data.json`
2. Add your profile image to `static/images/profile.jpg`
3. Modify the CSS in `static/css/styles.css` to match your preferred color scheme
4. Update the project details and add more projects as needed

## Deployment

This portfolio can be easily deployed to platforms like:
- Heroku
- Netlify
- Vercel
- PythonAnywhere

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out to [your email].

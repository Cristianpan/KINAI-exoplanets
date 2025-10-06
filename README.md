# KINAI-exoplanets 🪐

[![NASA Space Apps Challenge 2025](https://img.shields.io/badge/NASA-Space%20Apps%202025-0B3D91?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-FF6F00?style=for-the-badge&logo=tensorflow)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-000000?style=for-the-badge&logo=nextdotjs)

## 🌟 Project Overview

**KINAI** is an AI-powered exoplanet discovery platform that leverages machine learning to automatically identify potential exoplanets from NASA's Kepler and TESS mission data. Our solution combines traditional machine learning with deep learning approaches to accelerate the search for new worlds beyond our solar system.

> 🚀 **NASA Space Apps Challenge 2025 Submission**: *A World Away: Hunting for Exoplanets with AI*

## 📊 Project Demonstration

- **📋 Project Demo**: [Production URL](https://kinai-exoplanets.vercel.app/)
- **🐙 GitHub Repository**: [KINAI-exoplanets](https://github.com/Cristianpan/KINAI-exoplanets)

## 🎯 Key Features

- **Dual-Model Approach**: Combines Random Forest for tabular data and CNN for light-curve analysis
- **Web Interface**: User-friendly platform for exoplanet exploration and analysis
- **Real-time Predictions**: API endpoint for classifying new candidate systems
- **Multi-mission Support**: Works with both Kepler and TESS mission data

## 🏗️ Project Structure
```
KINAI-exoplanets/
├── 📚 kinai-machine-learning/ # ML models & data analysis
│ ├── models/CNN1D.ipynb # Convolutional Neural Network
│ ├── models/RF.ipynb # Random Forest classifier
│ ├── data/ # Kepler & TESS datasets
│ └── notebooks/ # Data exploration & preprocessing
├── 🔧 kinai-back/ # FastAPI backend
│ ├── ai_models/ # Trained models (.h5, .pkl)
│ ├── app/routes/ # API endpoints
│ ├── app/services/ # Data processing services
│ └── classes/ # Business logic
└── 🌐 kinai-front/ # Next.js frontend
├── src/components/ # React components
├── src/services/ # API clients
├── src/stores/ # State management
└── src/adapters/ # Data adapters
```


## 🧠 Machine Learning Approach

### Dual-Model Architecture

| Model | Data Type | Accuracy | Use Case |
|-------|-----------|----------|----------|
| **Random Forest** | Tabular parameters | 85% | Statistical classification |
| **1D CNN** | Light-curve time-series | 87% | Pattern recognition in flux data |

### Data Processing Pipeline

1. **Data Acquisition**: NASA Exoplanet Archive (Kepler & TESS)
2. **Feature Engineering**: Orbital period, transit depth, stellar parameters
3. **Light-curve Preprocessing**: 
   - Spline-based flattening
   - Phase-folding on orbital period
   - Global/Local view generation
4. **Model Training**: Binary classification (Confirmed vs False Positive)

### Performance Metrics

**Random Forest Model:**
- Accuracy: 0.85
- Precision: 0.77  
- Recall: 0.90
- F1-Score: 0.83
- ROC-AUC: 0.92

**CNN Model:**
- Accuracy: 0.87
- Effective at detecting subtle transit patterns in noisy data

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup
```bash
cd kinai-back
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
python run_dev.py
```


### Frontend
```bash
cd kinai-front
npm install
npm run dev
```

## 🛠️ Technology Stack

### Backend

- FastAPI - Modern Python web framework

- Scikit-learn - Random Forest implementation

- TensorFlow/Keras - CNN model development

- Pandas/NumPy - Data manipulation

### Frontend

- Next.js 14 - React framework

- TypeScript - Type safety

- Tailwind CSS - Styling

- Zustand - State management

### AI/ML

- Random Forest - Tabular data classification

- 1D CNN - Time-series pattern recognition

- Adam Optimizer - Neural network training

- Early Stopping - Overfitting prevention

### 🤖 Use of Artificial Intelligence

We leveraged AI tools throughout our development process:

- ChatGPT & Vercel AI: Code prototyping, debugging, and model tuning

- AI-assisted development: Accelerated implementation of web application and ML pipelines

- Documentation & ideation: Improved project clarity and presentation

## 🎯 NASA Challenge Alignment

This project directly addresses the "A World Away: Hunting for Exoplanets with AI" challenge by:

- ✅ Creating AI/ML models trained on NASA's open-source exoplanet datasets
- ✅ Developing accurate classification systems for planetary identification
- ✅ Enabling automated analysis of large astronomical datasets
- ✅ Supporting both Kepler and TESS mission data
- ✅ Providing accessible tools for scientists and enthusiasts
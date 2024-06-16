# AssistBot

Welcome to AssistBot, a customer support chatbot that leverages a fine-tuned version of OpenAI's GPT-3.5-turbo to generate accurate and context-aware responses.

## Features

- **Interactive User Interface:** Built with JavaScript for a seamless and intuitive user experience.
- **Real-time Database:** Uses Firebase for efficient and scalable database storage.
- **AI-Powered Support:** Integrates OpenAI's API with a fine-tuned GPT-3.5-turbo model to deliver high-quality customer support.
- **Rich Training Dataset:** The model is fine-tuned using a sample from the Bitext - Customer Service Training Dataset, available on HuggingFace, ensuring comprehensive and relevant assistance.

## Technologies Used

- **JavaScript:** For creating the dynamic and interactive front-end interface.
- **Firebase:** For backend database storage and management.
- **OpenAI API:** To integrate and fine-tune the GPT-3.5-turbo model for customer support functionality.
- **Vite:** For building and serving the application efficiently.
- **Netlify:** For deploying the app


If you want to test the app on your own system, you will need to create your own fine-tuned AI model, as OpenAI currently does not allow the sharing of custom models. Below are simplified instructions on how to set up the project.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/loghinfrancisc/AssistBot.git
   cd AssistBot

2. **Install Dependencies:**
Ensure you have 'npm' installed, Then run:
    ```bash
    npm install

3. **Set up Firebase:**
Create a Firebase project and add your configuration details in the firebaseConfig variable.

4. **Configure OpenAI API:**
Obtain an API key from OpenAI and add it to your '.env' file.

5. **Run the Application:**
    ```bash
    npm start

## Usage

Once the app is runing, navigate to 'http://localhost:3000' in your browser to interact with the ChatGPT-powered customer support assistant.

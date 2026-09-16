pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/whitefoxgod/mern-calculator.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
                sh 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }
    }
}

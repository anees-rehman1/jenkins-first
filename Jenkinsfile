pipeline {
    agent any
    
    environment {
        PROJECT_NAME = "my-app"
        VERSION = "1.0.0"
    }
    
    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deploy environment')
    }
    
    stages {
        // Remove this Clone stage - Jenkins will clone automatically
        stage('Build') {
            steps {
                echo "Building ${PROJECT_NAME} v${VERSION} for ${params.ENVIRONMENT}"
                echo "Building from branch: ${params.BRANCH}"
                // Example build commands - choose one based on your project:
                // For Java: sh 'mvn clean compile'
                // For Node.js: sh 'npm install && npm run build'
                // For Python: sh 'pip install -r requirements.txt'
                sh 'echo "Build step would run here"'
            }
        }
        
        // Add more stages as needed
        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
            // Optional: Enable email after configuring Jenkins email
            // mail to: 'team@example.com',
            //      subject: "Build Success: ${env.JOB_NAME}",
            //      body: "Build ${env.BUILD_NUMBER} completed successfully."
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

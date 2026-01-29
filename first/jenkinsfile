// File: Jenkinsfile
pipeline {
    agent any  // Runs on any available agent
    
    stages {
        stage('Hello World') {
            steps {
                echo 'Hello, World!'
                echo "Current workspace: ${WORKSPACE}"
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}

pipeline {
    agent any
    
    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['dev', 'staging', 'prod'], description: 'Select deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests before deployment')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Starting pipeline...'
                echo "Deploying to: ${params.DEPLOY_ENV}"
                sh 'ls -la'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing...'
                sh '''
                    echo "Checking files..."
                    ls -la
                    echo "✓ All files checked"
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deploying to ${params.DEPLOY_ENV}"
                sh 'echo "Deployment simulation complete"'
            }
        }
    }
    
    post {
        always {
            echo "Pipeline ${currentBuild.result ?: 'SUCCESS'} - Build #${BUILD_NUMBER}"
        }
    }
}
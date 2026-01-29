pipeline {
    agent any 

    stages {
        stage('Hello world') {
            steps {
                echo 'Hello World'
                echo "current workspace: ${WORKSPACE}"
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed '
        }
    }
}

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
        failed {
            echo 'Pipeline completed '
        }
    }
}

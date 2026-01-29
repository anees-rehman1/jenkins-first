pipeline {
    agent any
    
    // Environment variables available to all stages
    environment {
        // You can set custom environment variables here
        PROJECT_NAME = 'simple-website'
        DEPLOY_DIR = '/var/www/html'  // Change this to your actual deploy directory
        DOCKER_IMAGE = 'nginx:alpine'  // For container deployment demo
    }
    
    // Optional: Parameters that can be passed when triggering the build
    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['dev', 'staging', 'prod'], description: 'Select deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests before deployment')
    }
    
    stages {
        // Stage 1: Checkout code from GitHub
        stage('Checkout') {
            steps {
                echo 'Starting pipeline...'
                echo "Deploying to: ${params.DEPLOY_ENV}"
                
                // Clean workspace before checkout
                cleanWs()
                
                // Checkout code from SCM (Git)
                git branch: 'main',
                    url: 'https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git'
                
                // Show what was checked out
                sh 'ls -la'
                echo "Current branch: ${env.GIT_BRANCH}"
            }
        }
        
        // Stage 2: Validate and Test
        stage('Validate & Test') {
            steps {
                echo 'Validating website files...'
                
                // Check if required files exist
                sh '''
                    echo "Checking required files..."
                    ls -la
                    [ -f index.html ] && echo "✓ index.html found" || exit 1
                    [ -f style.css ] && echo "✓ style.css found" || exit 1
                    [ -f script.js ] && echo "✓ script.js found" || exit 1
                    echo "All required files are present!"
                '''
                
                // Simple HTML validation (basic check)
                sh '''
                    echo "Validating HTML structure..."
                    if grep -q "<!DOCTYPE html>" index.html; then
                        echo "✓ Valid HTML5 doctype found"
                    else
                        echo "✗ Invalid HTML5 doctype"
                        exit 1
                    fi
                '''
                
                // Run tests if parameter is set to true
                script {
                    if (params.RUN_TESTS) {
                        echo "Running tests..."
                        // Here you could run actual tests like:
                        // sh 'npm test' or sh 'pytest' etc.
                        // For demo, we'll simulate tests
                        sh '''
                            echo "Running simulated tests..."
                            echo "✓ Test 1: CSS file exists - PASSED"
                            echo "✓ Test 2: JavaScript file exists - PASSED"
                            echo "✓ Test 3: HTML is valid - PASSED"
                            echo "All tests passed!"
                        '''
                    } else {
                        echo "Tests skipped as per parameter setting"
                    }
                }
            }
            
            // Post-stage actions
            post {
                success {
                    echo 'Validation and tests completed successfully!'
                }
                failure {
                    echo 'Validation or tests failed!'
                    // You could send notifications here
                }
            }
        }
        
        // Stage 3: Build (for websites, this might mean minification, etc.)
        stage('Build') {
            steps {
                echo 'Building website...'
                
                // For a real website, you might:
                // - Minify CSS and JS
                // - Optimize images
                // - Bundle files
                
                // For this demo, we'll create a build info file
                sh '''
                    echo "=== Build Information ===" > build-info.txt
                    echo "Project: ${PROJECT_NAME}" >> build-info.txt
                    echo "Build Number: ${BUILD_NUMBER}" >> build-info.txt
                    echo "Build URL: ${BUILD_URL}" >> build-info.txt
                    echo "Built by: ${BUILD_USER}" >> build-info.txt
                    echo "Date: $(date)" >> build-info.txt
                    echo "Deploy Environment: ${params.DEPLOY_ENV}" >> build-info.txt
                    echo "=========================" >> build-info.txt
                    
                    cat build-info.txt
                '''
                
                // Create a simple archive (in real scenario, you might use npm build, webpack, etc.)
                sh 'zip -r website-build.zip *.html *.css *.js *.txt'
                
                echo 'Build completed successfully!'
            }
        }
        
        // Stage 4: Deploy
        stage('Deploy') {
            steps {
                echo "Deploying to ${params.DEPLOY_ENV} environment..."
                
                script {
                    // Different deployment strategies based on environment
                    switch(params.DEPLOY_ENV) {
                        case 'dev':
                            echo "Deploying to Development environment"
                            // For demo: just copy files (in real scenario, deploy to dev server)
                            sh '''
                                echo "Simulating dev deployment..."
                                mkdir -p dev-deploy
                                cp -r *.html *.css *.js *.txt *.zip dev-deploy/
                                ls -la dev-deploy/
                            '''
                            break
                            
                        case 'staging':
                            echo "Deploying to Staging environment"
                            // Could deploy to a staging server
                            sh '''
                                echo "Simulating staging deployment..."
                                echo "Files would be deployed to staging server here"
                            '''
                            break
                            
                        case 'prod':
                            echo "Deploying to Production environment"
                            // Production deployment with more checks
                            sh '''
                                echo "Simulating production deployment..."
                                echo "This would deploy to actual production servers"
                                echo "Production deployment requires additional approvals"
                            '''
                            break
                    }
                }
                
                // For Docker deployment (alternative approach)
                // sh "docker run -d --name ${PROJECT_NAME} -p 8080:80 ${DOCKER_IMAGE}"
                
                echo "Deployment to ${params.DEPLOY_ENV} completed!"
            }
        }
        
        // Stage 5: Verification (optional)
        stage('Verify') {
            steps {
                echo 'Verifying deployment...'
                
                // Basic verification
                sh '''
                    echo "Verifying deployed files..."
                    [ -f index.html ] && echo "✓ index.html verified" || echo "✗ index.html missing"
                    [ -f style.css ] && echo "✓ style.css verified" || echo "✗ style.css missing"
                    [ -f script.js ] && echo "✓ script.js verified" || echo "✗ script.js missing"
                '''
                
                // Could add URL health check here
                // sh 'curl -f http://localhost:8080 || exit 1'
                
                echo 'Verification completed!'
            }
        }
    }
    
    // Post-build actions
    post {
        always {
            echo "Pipeline ${currentBuild.result ?: 'SUCCESS'} - Build #${BUILD_NUMBER}"
            
            // Archive artifacts (zip file)
            archiveArtifacts artifacts: '*.zip, *.txt', fingerprint: true
            
            // Clean up workspace (optional)
            // cleanWs()
        }
        
        success {
            echo '🎉 Pipeline executed successfully!'
            
            // Send success notification (example)
            // emailext subject: "Pipeline Success: ${JOB_NAME}",
            //     body: "Build ${BUILD_NUMBER} succeeded!\nCheck it out: ${BUILD_URL}",
            //     to: 'team@example.com'
        }
        
        failure {
            echo '❌ Pipeline failed!'
            
            // Send failure notification (example)
            // emailext subject: "Pipeline Failed: ${JOB_NAME}",
            //     body: "Build ${BUILD_NUMBER} failed!\nCheck logs: ${BUILD_URL}",
            //     to: 'team@example.com'
        }
        
        changed {
            echo 'Pipeline status changed!'
        }
    }
}
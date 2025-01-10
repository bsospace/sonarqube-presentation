pipeline {
    agent any

    stages {
        stage("Checkout Code") {
            steps {
                echo 'Checking out code from GitHub'
                checkout scm
            }
        }

        stage("Install Dependencies") {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage("Build") {
            steps {
                echo 'Building the project...'
                sh 'npm run build'
            }
        }

        stage("Run SonarQube") {
            environment {
                scannerHome = tool 'SonarQube-Scanner';
            }
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=bso-sonarqube \
                            -Dsonar.sources=. \
                            -Dsonar.language=js \
                            -Dsonar.exclusions=node_modules/**,dist/** \
                            -Dsonar.host.url=https://sonarqube.bsospace.com \
                            -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }

        stage("Deploy") {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deploying using docker-compose.yml"
                        sh "docker compose up -d --build"
                    } else {
                        echo 'skipping deployment for non-main branches'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Build completed. Status: ${currentBuild.currentResult}"
        }
        success {
            echo "Build and deployment succeeded! 🎉"
        }
        failure {
            echo "Build or deployment failed. Please check the logs. 💥"
        }
    }
}

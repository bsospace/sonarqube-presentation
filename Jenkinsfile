pipeline {
    agent any

    stages {
        stage("Checkout Code") {
            steps {
                echo 'Checking out code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build'
            }
        }

        stage('Run Sonarqube') {
            environment {
                scannerHome = tool 'SonarQube-Scanner';
            }
            steps {
                // ใช้ withCredentials เพื่อดึงโทเค็นจาก Jenkins credentials store
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=bso-sonarqube \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=https://sonarqube.bsospace.com \
                            -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch pattern: 'release/.*'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deploying using docker-compose.yml"
                        sh "docker compose up -d"
                    } else {
                        echo "Deploying using docker-compose.release.yml"
                        sh "docker compose -f docker-compose.release.yml up -d"
                    }
                }
            }
        }
    }
    post{
        always{
            echo "====++++always++++===="
        }
        success{
            echo "====++++only when successful++++===="
        }
        failure{
            echo "====++++only when failed++++===="
        }
    }
}

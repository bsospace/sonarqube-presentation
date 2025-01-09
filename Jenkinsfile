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

        stage('Code Analysis') {
            steps {
                echo 'Analyzing code with SonarQube...'
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=bso-sonarqube \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=https://sonarqube.bsospace.com \
                          -Dsonar.login=$SONAR_TOKEN
                    '''
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
}

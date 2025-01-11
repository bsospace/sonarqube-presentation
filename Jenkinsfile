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

    post {
        always {
            script {
                def color = (currentBuild.result == 'SUCCESS') ? 3066993 : 15158332
                def status = (currentBuild.result == 'SUCCESS') ? '✅ Success' : '❌ Failure'
                def timestamp = new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'", TimeZone.getTimeZone('UTC'))

                discordSend(
                    description: "Pipeline execution details below:",
                    footer: "Pipeline executed at",
                    footerIcon: "https://raw.githubusercontent.com/bsospace/assets/refs/heads/main/LOGO/LOGO%20WITH%20CIRCLE.ico",
                    thumbnail: "https://raw.githubusercontent.com/bsospace/assets/refs/heads/main/LOGO/LOGO%20WITH%20CIRCLE.ico",
                    title: "🚀 Pipeline Execution Report For BSO Blog Front-end",
                    url: "https://discordapp.com/api/webhooks/1327552891384238100/htBat-oTiD20pG0rjLgEeCtOFM-v7tEsL-tP9mkVCxTw6KQ2xsF9eS4dmD0qRhGLBoDm",
                    webhookURL: "https://discordapp.com/api/webhooks/1327552891384238100/htBat-oTiD20pG0rjLgEeCtOFM-v7tEsL-tP9mkVCxTw6KQ2xsF9eS4dmD0qRhGLBoDm",
                    fields: [
                        [name: "Job", value: "${env.JOB_NAME} [#${env.BUILD_NUMBER}]", inline: true],
                        [name: "Status", value: status, inline: true],
                        [name: "Branch", value: "${env.BRANCH_NAME ?: 'unknown'}", inline: true],
                        [name: "Author", value: "${env.LAST_COMMIT_AUTHOR ?: 'unknown'}", inline: true],
                        [name: "Commit Message", value: "${env.LAST_COMMIT_MESSAGE ?: 'unknown'}", inline: false]
                    ],
                    color: color
                )
            }
        }
    }
}

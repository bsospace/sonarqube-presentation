pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-webhook')
        SONAR_SERVER_URL = 'https://sonarqube.bsospace.com'
        SONAR_PROJECT_KEY = 'bso-sonarqube'
    }

    tools {
        sonarQubeScanner 'SonarQube-Scanner'
    }

    stages {
        stage("Checkout Code") {
            steps {
                echo '🔄 Checking out code from GitHub...'
                checkout scm
            }
        }

        stage("Install Dependencies") {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage("Build") {
            steps {
                echo '⚙️ Building the project...'
                sh 'npm run build'
            }
        }

        stage("Run SonarQube Analysis") {
            steps {
                withSonarQubeEnv('SonarQube-Scanner') {  
                    sh """
                        sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${SONAR_SERVER_URL} \
                            -Dsonar.login=${SONAR_AUTH_TOKEN}
                    """
                }
            }
        }

        stage('Quality Gate Check') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK') {
                            error "🚨 Quality Gate Failed: ${qualityGate.status}"
                        } else {
                            echo "✅ Quality Gate Passed!"
                        }
                    }
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
                        echo "🚀 Deploying using docker-compose.yml"
                        sh "docker compose up -d --build"
                    } else {
                        echo '⚠️ Skipping deployment for non-main branches'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def qualityGateResult = waitForQualityGate()
                def statusEmoji = (qualityGateResult.status == 'OK') ? ':white_check_mark:' : ':x:'
                def statusText = (qualityGateResult.status == 'OK') ? 'Success' : 'Failed'
                def branchName = env.BRANCH_NAME ?: 'unknown'
                def projectKey = SONAR_PROJECT_KEY
                def sonarReportUrl = "${SONAR_SERVER_URL}/dashboard?id=${projectKey}"
                def lastCommitBy = "${env.GIT_COMMITTER_NAME ?: 'unknown'}"
                def lastCommitMessage = "${env.GIT_COMMIT_MESSAGE ?: 'No commit message'}"

                def payload = [
                    content: null,
                    embeds: [[
                        title: ":rocket: Pipeline Report for ${projectKey} [#${env.BUILD_NUMBER}]",
                        color: (qualityGateResult.status == 'OK') ? 3066993 : 15158332,
                        fields: [
                            [ name: ":sunglasses: Status", value: "${statusEmoji} ${statusText}", inline: true ],
                            [ name: ":seedling: Branch", value: branchName, inline: true ],
                            [ name: ":memo: Commit Message", value: lastCommitMessage, inline: false ],
                            [ name: ":link: SonarQube Report", value: sonarReportUrl, inline: false ]
                        ],
                        footer: [ text: "Generated on ${new Date().format('yyyy-MM-dd HH:mm:ss')}" ]
                    ]]
                ]

                httpRequest(
                    url: env.DISCORD_WEBHOOK,
                    httpMode: 'POST',
                    contentType: 'APPLICATION_JSON',
                    requestBody: groovy.json.JsonOutput.toJson(payload)
                )
            }
        }
    }
}

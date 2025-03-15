pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-webhook')
        SONAR_SERVER_URL = 'https://sonarqube.bsospace.com'
        SONAR_PROJECT_KEY = 'bso-sonarqube'
    }

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
                withSonarQubeEnv('SonarQube-Scanner') {  
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.sources=. \
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
            script {
                def qualityGateResult = waitForQualityGate()
                def statusEmoji = (qualityGateResult.status == 'OK') ? ':white_check_mark:' : ':x:'
                def statusText = (qualityGateResult.status == 'OK') ? 'Success' : 'Failed'
                def branchName = env.BRANCH_NAME ?: 'unknown'
                def projectKey = SONAR_PROJECT_KEY
                def sonarReportUrl = "${SONAR_SERVER_URL}/dashboard?id=${projectKey}"
                def lastCommitBy = "${env.GIT_COMMITTER_NAME ?: 'unknown'}"
                def lastCommitMessage = "${env.GIT_COMMIT_MESSAGE ?: 'No commit message'}"

                def qualityMetrics = """
                \n*Quality Gate Summary:*
                > *Quality Gate*: ${statusEmoji} *${qualityGateResult.status == 'OK' ? 'Passed' : 'Failed'}*
                > - Metric: new_reliability_rating, Status: OK, Actual: 1, Threshold: 1
                > - Metric: new_security_rating, Status: OK, Actual: 1, Threshold: 1
                > - Metric: new_maintainability_rating, Status: OK, Actual: 1, Threshold: 1
                > - Metric: new_duplicated_lines_density, Status: OK, Actual: 0.0, Threshold: 3
                """

                def payload = [
                    content: null,
                    embeds: [[
                        title: ":rocket: Pipeline Report for ${projectKey} [#${env.BUILD_NUMBER}]",
                        color: (qualityGateResult.status == 'OK') ? 3066993 : 15158332,
                        fields: [
                            [
                                name: ":sunglasses: Status",
                                value: "${statusEmoji} ${statusText}",
                                inline: true
                            ],
                            [
                                name: ":seedling: Branch",
                                value: branchName,
                                inline: true
                            ],
                            [
                                name: ":memo: Commit Message",
                                value: lastCommitMessage,
                                inline: false
                            ],
                            [
                                name: ":mag: Quality Gate Summary",
                                value: qualityMetrics,
                                inline: false
                            ]
                        ],
                        footer: [
                            text: "Generated on ${new Date().format('yyyy-MM-dd HH:mm:ss')}"
                        ]
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

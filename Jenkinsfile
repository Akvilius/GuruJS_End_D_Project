pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                nodejs('NodeJS2290') {
                    sh 'npm i'
                    sh 'npx playwright install --with-deps'
                    sh 'npm t'
                }
            }
        }
        stage('Allure') {
            steps {
                allure includeProperties: false,
                       jdk: '',
                       properties: [],
                       reportBuildPolicy: 'ALWAYS',
                       results: [[path: 'allure-results']]
            }
        }
    }
}
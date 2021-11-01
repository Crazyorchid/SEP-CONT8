pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Pull') {
            steps {
                git branch: 'development', credentialsId: 'Crazyorchid', url: 'https://github.com/Crazyorchid/SEP-CONT8.git'
            }
        }

        stage('Install') {
            steps {
                sh '''
                npm install --registry=https://registry.npm.taobao.org
                npm install core-js@2.6.5 --save --registry=https://registry.npm.taobao.org
                '''
            }
        }

        stage('Build') {
            steps {
                script {
                   sh 'npm run build'
                    }
                }
            }
        }
        stage('deploy to S3'){
          steps{
              sh 'aws s3 cp public s3://cont8 --recursive'
          }
      }
    }
}
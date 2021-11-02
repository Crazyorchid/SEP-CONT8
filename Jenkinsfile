pipeline {
    agent any

    stages {
        stage('Pull') {
            steps {
                git branch:'development', credentialsId: 'Crazyorchid', url: 'https://github.com/Crazyorchid/SEP-CONT8'
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
                        sh '''npm run build'''
                }
            }
        }
        stage('test') {
            steps {
                script {                
                        sh '''npm run test'''
                }
            }
        }

        stage('Production') {
            steps {
                withAWS(region:'ap-southeast-2',credentials:'AWS-Credentials-Jenkins') {
                s3Delete(bucket: 'cont8', path:'**/*')
                s3Upload(bucket: 'cont8', workingDir:'build', includePathPattern:'**/*');
            }
          }
        }
    }
}
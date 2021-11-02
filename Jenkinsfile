pipeline {
    gent {
        docker {
            //using this docker image to run the following tasks
            image 'node:14.18.0'
        }
    }

    stages {
        stage('Pull') {
            steps {
                git branch:'development', credentialsId: 'Crazyorchid', url: 'https://github.com/Crazyorchid/SEP-CONT8'
            }
        }

        stage('Install') {
            steps {
                sh '''
                npm install
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
                        sh '''npm run unit'''
                }
            }
        }

        stage('Production') {
            steps {
                withAWS(region:'us-east-2',credentials:'AWS-Credentials-Jenkins') {
                s3Delete(bucket: 'cont8', path:'**/*')
                s3Upload(bucket: 'cont8', workingDir:'build', includePathPattern:'**/*');
            }
          }
        }
    }
}
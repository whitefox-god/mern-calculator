pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        docker build --target frontend \
                        -t $DOCKERHUB_USER/mern-calculator:frontend \
                        -t $DOCKERHUB_USER/mern-calculator:frontend-$BUILD_NUMBER .

                        docker build --target backend \
                        -t $DOCKERHUB_USER/mern-calculator:backend \
                        -t $DOCKERHUB_USER/mern-calculator:backend-$BUILD_NUMBER .
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login \
                        -u "$DOCKERHUB_USER" --password-stdin

                        docker push $DOCKERHUB_USER/mern-calculator:frontend
                        docker push $DOCKERHUB_USER/mern-calculator:frontend-$BUILD_NUMBER

                        docker push $DOCKERHUB_USER/mern-calculator:backend
                        docker push $DOCKERHUB_USER/mern-calculator:backend-$BUILD_NUMBER

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        export DOCKERHUB_USER

                        docker compose pull
                        docker compose up -d --force-recreate --remove-orphans
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker ps
                    curl -f http://localhost:8081
                    curl -f -X POST http://localhost:8081/api/calculate \
                    -H 'Content-Type: application/json' \
                    -d '{"a":8,"b":2,"operation":"+"}'
                '''
            }
        }
    }
}

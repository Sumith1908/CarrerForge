// List of microservices
def microservices = [
    'Login',
    'CompanyService',
    'AdminService',
]

pipeline {
    agent any
    environment {
        APP_NAME = 'career-forge'
        PUSH_TO_DOCKER_HUB = 'true'
        DOCKER_COMPOSE_CONFIG = 'default'
        DOCKER_IMAGE_PREFIX = 'sumith783/career-forge'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/Sumith1908/CarrerForge.git'
            }
        }
        stage('Run Tests (Backend)') {
            steps {
                script {
                    for (microservice in microservices) {
                        dir("${microservice}") {
                            echo "${microservice}"
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("login", "Login")
                    docker.build("admin", "AdminService")
                    docker.build("company", "CompanyService")
                    docker.build('frontend', 'career-forge')
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    if (env.PUSH_TO_DOCKER_HUB == 'true') {
                        // sh "docker login -u your-username -p \$DOCKER_PASSWORD"
                        docker.withRegistry('', 'DockerHubCred') {
                            sh "docker tag login ${env.DOCKER_IMAGE_PREFIX}-login:latest"
                            sh "docker push ${env.DOCKER_IMAGE_PREFIX}-login:latest"
                            sh "docker tag company ${env.DOCKER_IMAGE_PREFIX}-company:latest"
                            sh "docker push ${env.DOCKER_IMAGE_PREFIX}-company:latest"
                            sh "docker tag admin ${env.DOCKER_IMAGE_PREFIX}-admin:latest"
                            sh "docker push ${env.DOCKER_IMAGE_PREFIX}-admin:latest"
                            sh "docker tag frontend ${env.DOCKER_IMAGE_PREFIX}-frontend:latest"
                            sh "docker push ${env.DOCKER_IMAGE_PREFIX}-frontend:latest"
                        }
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker-compose -f docker-compose.yaml down'
                    sh '''
                        docker rm -f login-backend || true
                        docker rm -f login-frontend || true
                        docker rm -f company-service || true
                        docker rm -f admin-service || true
                        docker rm -f elastic || true
                        docker rm -f kibana || true
                        docker rm -f logstash || true
                    '''
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // sh 'docker-compose pull'
                    // sh 'docker-compose up -d'  # Start all services in docker-compose.yml
                    sh "docker-compose up -d" 
                }
            }
        }
    }
}

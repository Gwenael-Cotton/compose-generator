const readline = require('readline');
const writeYamlFile = require('write-yaml-file');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('what database user name ?', async (dbuser) => {
    rl.question('what database name ?', async (dbname) => {
        rl.question('what database password ?', async (dbpassword) => {

            console.log(`Userdb -> ${dbuser ? dbuser : ''}`);
            console.log(`Database name -> ${dbname ? dbuser : ''}`);
            console.log(`Database password -> ${dbpassword? dbpassword : ''}`);

            await writeYamlFile('docker-compose.yml', {
                version: '3',
                services: {
                    posgresDB: {
                        container_name: 'postgres',
                        restart: "no",
                        env_file: '.env',
                        image: 'postgres:14.5-alpine',
                        environment: {
                            POSTGRES_USER: dbuser ? dbuser : 'myuserdb',
                            POSTGRES_PASSWORD: dbpassword ? dbpassword : 'superpassword',
                            POSTGRES_DB: dbname ? dbname : 'mydatabasename'
                        },
                        volumes:[
                            'mystrapi-data:/var/lib/postgresql/data/'
                        ]               
                    }
                },
                ports: [ 
                    '5432:5432'
                ],  
                volumes: {
                    'mystrapi-data': null
                }               
            });
            console.log('Your docker-compose file is ready');
            rl.close();
        });
    });
});
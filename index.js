const readline = require('readline');
const writeYamlFile = require('write-yaml-file');

const rl = readline.createInterface(process.stdin, process.stdout);

/**
 * This fonction create a docker-compose.yml file with a POSTGRESQL instance,
 * she asks three question for init database user name, database name and database password
 * 
 */
function createDockerFile() {
    
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
                                'my-data:/var/lib/postgresql/data/'
                            ]               
                        }
                    },
                    ports: [ 
                        '5432:5432'
                    ],  
                    volumes: {
                        'my-data': null
                    }               
                });
                console.log('Your docker-compose file is ready');
                rl.close();
            });
        });
    });

}

createDockerFile();
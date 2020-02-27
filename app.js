/* WIREFRAME:
    < input team manager + number members:
        - name/email + number members
        - role = 'Manager'
     (loop)
        < member info:
            - name + role=(engineer | interns)
            - intern: school
            - engineer: github username

        
    what building blocks do we need?
    Employee class (name, email, role)
    Manager class (employees, array)
    Intern class (school)
    Engineer class (github)
    
    test creating of each class
    > create Manager Class, check it works.
    > add an employee (Intern): did it increase managers employees?
    > add an employee (engineer): did it increase employees.
    
    * TDD is nice but not necessary for this.
    */
    const inquirer = require( 'inquirer' );
    const fs = require( 'fs' );

    // global employee ID (increases with each new employee created)
    let ID = 1;

    class Employee {
        constructor (name, email, role){
            this.id = ID++; // increase each employee creation.
            this.name = name;
            this.email = email;
            this.role = role;
        }
    }

    class Manager extends Employee {
        constructor( name, email, officeNumber ){
            super( name, email, 'Manager' );
            this.officeNumber = officeNumber;
            this.users = [];
        }
    }

    class Engineer extends Employee {
            constructor( name, email, github ){
                super( name, email, 'Engineer' );
                this.github = github;
                this.users = [];
        }
    }

    class Intern extends Employee {
        constructor( name, email, school ){
            super( name, email, 'Intern' );
            this.school = school;
            this.users = [];
    }
}

    
    // function readCard( cardInfo ){
    //     // use role to get template file (ex. 'Manager' -> manager.html)
    //     const fileName = cardInfo.role.toLowerCase();
    //     const html = fs.readFileSync( `templates/${fileName}.html`, 'utf8' );

    //     // replace any {{ (field) }} from template and return
    //     return html.replace(/{{([^}]*)}}/g, function(match) {
    //         const name = match.substr(3,match.length-6); 
    //         return cardInfo[name] ? cardInfo[name] : ''; });
    //}


    async function main(){
        const managerData = await inquirer.prompt([
            { name: 'name', type: 'input', message: `What is the manager's name?` },
            { name: 'count', type: 'input', message: 'How many people work under them?' },
            { name: 'email', type: 'input', message: 'What is their email?' },
            { name: 'officeNumber', type: 'input', message: 'What is their office number?' }
        ]);

        // create manager object
        let manager = new Manager( managerData.name, managerData.email, managerData.officeNumber );

        const name = manager.name;
        const ID = manager.ID;
        const email = manager.email;
        const officeNumber = manager.officeNumber;
        console.log('Name: ' + name);
        console.log('email: ' + email);
        console.log(`Done`)

        fs.readFile("main.html", 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log(`data ${data}`);

            var card = `<div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">Engineer: ${name}</div>
                            <div class="card-body">
                                <h5 class="card-title id">ID:${ID}</h5>
                                <h5 class="card-title email">Email:${email}</h5>
                                <h5 class="card-title git">Office Number:${officeNumber}</h5>
                            </div>
                    </div>`;
            var result = data.replace(`</body>`, card + '</body>');

            fs.appendFile( "main.html" , result
            , function(err) {

                if (err) {
                return console.log(err);
                }
            
                console.log(`New: ${result}`);
          });
        });
          


        async function engineer(){

            const engineerData = await inquirer.prompt([
                { name: 'name', type: 'input', message: `What is the engineer's name?` },
                { name: 'email', type: 'input', message: 'What is their email?' },
                { name: 'git', type: 'input', message: 'What is their github?' }
            ]);

            let engineer = new Engineer( engineerData.name, engineerData.email, engineerData.git );

            const name = engineer.name;
            const ID = engineer.ID;
            const email = engineer.email;
            const github = engineer.github;
            console.log('Name: ' + name);
            console.log('email: ' + email);
            console.log(`Done`)

            fs.readFile("main.html", 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                //console.log(data);

                var card = `<div class="card bg-light mb-3" style="max-width: 18rem;">
                            <div class="card-header">Engineer: ${name}</div>
                                <div class="card-body">
                                    <h5 class="card-title id">ID:${ID}</h5>
                                    <h5 class="card-title email">Email:${email}</h5>
                                    <h5 class="card-title git">GitHub:${github}</h5>
                                </div>
                        </div>`;
                var result = data.replace(`</body>`, card + '</body>');

                fs.appendFile( "main.html" , result
                , function(err) {

                    if (err) {
                    return console.log(err);
                    }
                
                    console.log("Has written");
              });
            });
              
            
        }
              

        async function intern(){
            const internData = await inquirer.prompt([
                { name: 'name', type: 'input', message: `What is the intern's name?` },
                { name: 'school', type: 'input', message: 'What school do they go to?' }
            ]);

            let intern = new Intern( internData.name, internData.email, internData.school );

            const name = intern.name;
            const ID = intern.ID;
            const email = intern.email;
            const school = intern.school;
            console.log('Name: ' + name);
            console.log('email: ' + email);
            console.log(`Done`)

            fs.readFile("main.html", 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                //console.log(data);

                var card = `<div class="card bg-light mb-3" style="max-width: 18rem;">
                            <div class="card-header">Intern: ${name}</div>
                                <div class="card-body">
                                    <h5 class="card-title id">ID:${ID}</h5>
                                    <h5 class="card-title email">Email:${email}</h5>
                                    <h5 class="card-title git">School:${school}</h5>
                                </div>
                        </div>`;
                var result = data.replace(`</body>`, card + '</body>');
                console.log(result)

                fs.appendFile( "main.html" , result
                , function(err) {

                    if (err) {
                    return console.log(err);
                    }
                
                    console.log("Has written");
              });
            });
        }

        
        for( let userCnt=1; userCnt <= managerData.count; userCnt++ ){

            var rolePrompt = await inquirer.prompt({
                type: 'list',
                name: 'role',
                message: 'Would you like to input an Engineer or Intern',
                choices: ['Engineer', 'Intern']
              });

            if (rolePrompt.role === 'Engineer') {
                console.log('You chose engineer');
                    
                await engineer();
                } else {
                    console.log('You chose intern');
                    await intern();
                  }
                };

            // circle through asking about engineers/interns


        // now generate html and write file
        // let team = '';
        // team += readCard( manager );
        // manager.getUsers().forEach( function( user ){
        //     team += readCard( user );
        // });
        // const html = readCard( { role: 'main', team: team } );
        // fs.writeFileSync( 'org.html', html );
    }
    main();

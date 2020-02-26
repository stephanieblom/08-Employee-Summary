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
            constructor( name, email, officeNumber ){
                super( name, email, 'Engineer' );
                this.officeNumber = officeNumber;
                this.users = [];
        }
    }

    class Intern extends Employee {
        constructor( name, email, officeNumber ){
            super( name, email, 'Intern' );
            this.officeNumber = officeNumber;
            this.users = [];
    }
}

    
    function readCard( cardInfo  ){
        // use role to get template file (ex. 'Manager' -> manager.html)
        const fileName = cardInfo.role.toLowerCase();
        const html = fs.readFileSync( `templates/${fileName}.html`, 'utf8' );

        // replace any {{ (field) }} from template and return
        return html.replace(/{{([^}]*)}}/g, function(match) {
            const name = match.substr(3,match.length-6); 
            return cardInfo[name] ? cardInfo[name] : ''; });
    }


    async function main(){
        const managerData = await inquirer.prompt([
            { name: 'name', type: 'input', message: `What is the manager's name?` },
            { name: 'count', type: 'input', message: 'How many people work under them?' }
        ]);

        // create manager object
        let manager = new Manager( managerData.name, managerData.email, managerData.officeNumber );

        for( let userCnt=1; userCnt <= managerData.count; userCnt++ ){

            // circle through asking about engineers/interns
        }


        // now generate html and write file
        let team = '';
        team += readCard( manager );
        manager.getUsers().forEach( function( user ){
            team += readCard( user );
        });
        const html = readCard( { role: 'main', team: team } );
        fs.writeFileSync( 'org.html', html );
    }
    main();

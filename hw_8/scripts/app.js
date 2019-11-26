import {get,post,put,del} from './requester.js';

(() => 
{
    const partials =
    {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    };

    const app = Sammy('#main', function()
    {
        this.use('Handlebars', 'hbs');
        

        //Pages
        this.get('#/', function(context)
        {
            getSessionInfo(context);

            if(context.loggedIn)
            {
                get('appdata', 'teams', 'Kinvey')
                .then(teams => 
                {
                    let team = teams.find(t => t.members.some(m => m === context.username));

                    if(team)
                    {
                        context.teamId = team._id;
                        context.hasTeam = true;
                    }
                })
                .then(() => 
                {
                    this.loadPartials(partials)
                    .then(function()
                    {
                        this.partial('/templates/home/home.hbs');
                    });
                });
            }
            else
            {
                this.loadPartials(partials)
                .then(function()
                {
                    this.partial('/templates/home/home.hbs');
                });
            }   
        });

        this.get('#/about', function(context)
        {
            getSessionInfo(context);

            this.loadPartials(partials)
            .then(function()
            {
                this.partial('./templates/about/about.hbs');
            });
        });


        //Login
        this.get('#/login', function(context)
        {
            getSessionInfo(context);
            partials['loginForm'] = './templates/login/loginForm.hbs';

            this.loadPartials(partials)
            .then(function()
            {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function(context)
        {
            const {username, password} = context.params;

            post('user', 'login', {username, password}, 'Basic')
            .then(userInfo => 
            {
                sessionStorage.setItem('userId', userInfo._id);
                sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
                sessionStorage.setItem('username', userInfo.username);
            })
            .then(() => this.redirect('#/'))
            .catch(console.error);
        });

        //Logout
        this.get('#/logout', function(context)
        {
            sessionStorage.clear();
            this.redirect('#/');
        });


        //Register
        this.get('#/register', function(context)
        {
            getSessionInfo(context);
            partials['registerForm'] = './templates/register/registerForm.hbs';

            this.loadPartials(partials)
            .then(function()
            {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function(context)
        {
            const {username, password, repeatPassword} = context.params;

            if(password === repeatPassword)
            {
                post('user', '', {username, password}, 'Basic')
                .then(data => 
                {
                    this.redirect('#/login');
                })
                .catch(console.error);
            }
            else
            {
                alert('Passwords do not match');
            }
        });

        
        //Catalog
        this.get('#/catalog', function(context)
        {
            getSessionInfo(context);
            partials['team'] = './templates/catalog/team.hbs';

            get('appdata', 'teams', 'Kinvey')
            .then(data => 
            {
                context.teams = data;

                this.loadPartials(partials)
                .then(function()
                {
                    this.partial('./templates/catalog/teamCatalog.hbs');
                });
            })
            .catch(console.error);
        });


        //Create Team
        this.get('#/create', function(context)
        {
            getSessionInfo(context);
            partials['createForm'] = '/templates/create/createForm.hbs';

            this.loadPartials(partials)
            .then(function()
            {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function(context)
        {
            getSessionInfo(context);
            const {name, comment} = context.params;

            post('appdata', 'teams', {name,comment, members: []}, 'Kinvey')
            .then(() => this.redirect('#/catalog'))
            .catch(console.error);
        });


        //Edit Team
        this.get('#/edit/:id', function(context)
        {
            getSessionInfo(context);

            const id = context.params.id;
            partials['editForm'] = '/templates/edit/editForm.hbs';
            
            get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => 
            {
                context.teamId = id;
                context.name = teamInfo.name;
                context.comment = teamInfo.comment;

                this.loadPartials(partials)
                .then(function()
                {
                    this.partial('./templates/edit/editPage.hbs');
                });
            });
        });
        
        this.post('#/edit/:id', function (context) 
        {
            const id = context.params.id;
            const { name, comment } = context.params;

            get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => 
            {
                teamInfo.name = name;
                teamInfo.comment = comment;
    
                put('appdata', `teams/${id}`, teamInfo, 'Kinvey')
                .then(() => this.redirect(`#/catalog/${id}`))
                .catch(console.log);
            });
        });


        //Team Info
        this.get('#/catalog/:id', function(context)
        {
            getSessionInfo(context);

            const id = context.params.id;
            partials['teamMember'] = './templates/catalog/teamMember.hbs';
            partials['teamControls'] = './templates/catalog/teamControls.hbs';
            
            get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => 
            {
                context.name = teamInfo.name;
                context.comment = teamInfo.comment;
                context.members = teamInfo.members;
                context.teamId = teamInfo._id;
                context.isAuthor = teamInfo._acl.creator === context.userId;
                
                if(teamInfo.members.some(m => m === context.username))
                {
                    context.isOnTeam = true;
                }

                get('appdata', 'teams', 'Kinvey')
                .then(teams =>
                {
                    context.hasNoTeam = true;

                    for(let team of teams)
                    {
                        if(team.members.some(m => m === context.username))
                        {
                            context.hasNoTeam = false;
                            break;
                        }
                    }
                })
                .then(() =>
                {
                    this.loadPartials(partials)
                    .then(function()
                    {
                        this.partial('/templates/catalog/details.hbs');
                    });
                });
            })
        });

        
        //Actions
        this.get('#/join/:id', function(context)
        {
            getSessionInfo(context);

            const id = context.params.id;

            get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => 
            {
                teamInfo.members.push(context.username);

                put('appdata', `teams/${id}`, teamInfo, 'Kinvey')
                .then(() => this.redirect(`#/catalog/${id}`));
            })
            .catch(console.log);
        });

        this.get('#/leave/:id', function(context)
        {
            const id = context.params.id;
            
            get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => 
            {
                let editedTeam = 
                {
                    name: teamInfo.name,
                    comment: teamInfo.comment,
                    members: teamInfo.members.filter(x => x === context.username)
                };

                put('appdata', `teams/${id}`, editedTeam, 'Kinvey')
                .then(() => this.redirect(`#/catalog/${id}`));
            })
            .catch(console.log);
        })


        //Home redirects
        this.get('#/home', function(context)
        {
            this.redirect('#/');
        });

        this.get('/', function(context)
        {
            this.redirect('#/');
        });
    });


    function getSessionInfo(context)
    {
        context.userId = sessionStorage.getItem('userId');
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
    }

    app.run();
}
)();
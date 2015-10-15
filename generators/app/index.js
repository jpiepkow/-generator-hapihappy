'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var name,license,desc,username,handler,port;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
      var done = this.async();
      this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Your project name(no spaces):',
          default : this.appname
      },{
          type    : 'input',
          name    : 'username',
          message : 'Your name:',
          default : 'username'
      },{
          type    : 'input',
          name    : 'desc',
          message : 'Application description:',
          default : 'description'
      }, {
          type    : 'input',
          name    : 'license',
          message : 'License type:',
          default : 'MIT'
      },{
          type    : 'input',
          name    : 'handle_name',
          message : 'handler name(no spaces):',
          default : 'handler'
      },{
          type    : 'input',
          name    : 'port',
          message : 'Port to run on:',
          default : '8000'
      }], function (answers) {
          name = answers.name;
          license = answers.license;
          port = answers.port;
          desc = answers.desc;
          username = answers.username;
          handler = answers.handle_name;
          done();
      }.bind(this));
  },

  writing: {

    app: function () {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { title: name,
              name: username,
              desc: desc,
              license: license
            }
        );
        this.fs.copyTpl(
            this.templatePath('_handler.js'),
            this.destinationPath('/lib/'+handler+'.js'),
            { handle: handler }
        );
        this.fs.copyTpl(
            this.templatePath('_readme.md'),
            this.destinationPath('readme.md'),
            { title: name,
              desc:desc  }
        );
        this.fs.copyTpl(
            this.templatePath('_routes.js'),
            this.destinationPath('/config/routes.js'),
            { handle: handler }
        );
        this.fs.copyTpl(
            this.templatePath('_t_handler.js'),
            this.destinationPath('/test/lib/'+handler+'.js'),
            { handle: handler }
        );
        this.fs.copyTpl(
            this.templatePath('_settings.json'),
            this.destinationPath('/config/settings.json'),
            { port: port }
        );
      this.fs.copy(
        this.templatePath('_server.js'),
        this.destinationPath('server.js')
    );
    this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
    );
    }
  },

  install: function () {
    this.installDependencies();
      this.npmInstall();
  }
});

const { Console } = require("console-mpds");

//options

class Option {
    
    static console = new Console();
    #title;


    constructor(title){
        this.#title = title;
    }
    
    getTitle(){
        return this.#title;
    }

    showTitle(index){
        Option.console.writeln(index + " - " + this.getTitle());
    }
    interact(){}
}

class QuitOption extends Option{

    #quited;

    constructor(name){
        super(name);
        this.#quited = false;
    }

    interact(){
        this.#quited = true;
    }

    isQuited(){
        return this.#quited;
    }
}

class ListOption extends Option{
    
    #model;

    constructor(title, model){
        super(title);
        this.#model = model;
    }

    interact(){
        for (let i = 0; i < this.#model.getSize(); i++) {
            Option.console.writeln(this.#model.getName(i));
        }
    }
}

class ReverseListOption extends Option{
    
    #model;

    constructor(title, model){
        super(title);
        this.#model = model;
    }

    interact(){
        for (let i = (this.#model.getSize() - 1); i >= 0; i--) {
            Option.console.writeln(this.#model.getName(i));
        }
    }
}

//menus

class Menu {

    #title;
    #options;
    static console = new Console();

    constructor (title){
        this.#title = title;
        this.#options = new Array();
    }



    showOptions(){
        Menu.console.writeln(this.#title);
        for (let i = 0; i < this.#options.length; i++) {
            this.#options[i].showTitle(i + 1);
            
        }
    }

    chooseOption(){
        let userOption;
        userOption = Menu.console.readNumber("Insert option: ");
        this.#options[userOption - 1].interact();

    }
    
    addOption(option){
        this.#options.push(option);

    }

    hasOption(option){
        return this.#options.includes(option);
    }

    interact(){
        this.showOptions();
        this.chooseOption();

    }

}

class QuitMenu extends Menu{

    #quitOption;

    constructor(name){
        super(name);
        this.#quitOption = new QuitOption("quit");
    }

    interact(){
        do{
            this.showOptions();
            this.chooseOption();
        }while(!this.#quitOption.isQuited());
       
    }

    showOptions(){
        if(!this.hasOption(this.#quitOption)){
            this.addOption(this.#quitOption);
        }
        super.showOptions();
    }



}

//models

class Model {

    #names;

    constructor(){
        this.#names = ["a", "b", "c"];
    }

    addName(name){
        this.#names.push(name);
    }
    getName(index) {
        return this.#names[index];
    }

    getSize(){
        return this.#names.length;
    }

}

//app

class App {

    #menu;
    #users;

    constructor(){
        this.#users = new Model();
    }

    execute() {
        
        //this.#menu = new Menu("Main menu\n---------");
        this.#menu = new QuitMenu("Main menu with quit Option\n---------");
        let listOption = new ListOption("List", this.#users);
        let reverseListOption = new ReverseListOption("ReverseList", this.#users);
        this.#menu.addOption(listOption);
        this.#menu.addOption(reverseListOption);
        this.#menu.interact();

    }
}

new App().execute();
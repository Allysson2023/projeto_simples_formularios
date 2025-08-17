class User{

    constructor(nomeProduto, valorDoProduto){

        this._id;
        this._nomeProduto = nomeProduto;
        this._valorDoProduto = valorDoProduto;
    };

    get id(){
        return this._id;
    }

    get nomeProduto(){
        return this._nomeProduto;
    };

    get valorDoProduto(){
        return this._valorDoProduto;
    };

    loadFromJSON(json){

        for (let name in json){

            this[name] = json[name];

        };

    };

    static getUserStorage(){
        let users = [];
    
        if(localStorage.getItem("user")){
            users = JSON.parse(localStorage.getItem("user"));
        }
        return users;

    }

    getNewId(){

        if(!window.id) window.id = 0;

        id++;

        return id;

    }

    save(){

        let users = User.getUserStorage();

        if(this.id > 0){

             users.map(u=>{

                if(u._id == this.id){

                    Object.assign(u, this);

                };

                return u;

             });
             
        } else{

            this._id = this.getNewId();
            
            users.push(this);
    
        };
        
        localStorage.setItem("user", JSON.stringify(users));
    };

}
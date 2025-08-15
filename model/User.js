class User{

    constructor(nomeProduto, valorDoProduto){
        this._nomeProduto = nomeProduto;
        this._valorDoProduto = valorDoProduto;
    }

    get nomeProduto(){
        return this._nomeProduto;
    }
    get valorDoProduto(){
        return this._valorDoProduto;
    }

    loadFromJSON(json){

        for (let name in json){

            this[name] = json[name];

        };

    }

}
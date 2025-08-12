class UserController{

    // pegando o id do formularios
    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    };

    // methodo do butao submit para envia o formulario
    onSubmit(){

        // pegando os dados do Formulario...
        this.formEl.addEventListener("submit", evento =>{

            // preventeDefault -> é para não atualiza a pagina...
            evento.preventDefault();

            this.addLine(this.getValues());

        });

    }

    getValues(){

        let user = {};

        // pegando o campos do fomularios
        [...this.formEl.elements].forEach( (field, index)=>{

            user[field.name] = field.value;

        });

        return new User(user.nomeProduto, user.valorDoProduto);

    };

    // adicionando uma linha na tabela...
    // data é objeto da class => representa a class
    addLine(dataUser){

        // criando o modelo do html
        // pegando o Id da tabela tbody para coloca o html
        this.tableEl.innerHTML = `
            <tr>
                <td>${dataUser.nomeProduto}</td>
                <td>${dataUser.valorDoProduto}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-delete">Excluir</button>
                </td>    
            </tr>`;
    
    };

}
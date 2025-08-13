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

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            this.addLine(this.getValues());

            this.formEl.reset();

            btn.disabled = false;

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

        let tr = document.createElement('tr');

        // criando o modelo do html
        // pegando o Id da tabela tbody para coloca o html
        tr.innerHTML = `
                <td>${dataUser.nomeProduto}</td>
                <td>${dataUser.valorDoProduto}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-delete">Excluir</button>
                </td>
        `;
            this.tableEl.appendChild(tr);
    
    };

}
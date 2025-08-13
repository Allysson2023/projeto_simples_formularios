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

            let userData = this.getValues();
            if(!userData){
                btn.disabled = false;
                alert("Preencha o formulario!")
                return;
            }

            this.addLine(userData);

            this.formEl.reset();

            btn.disabled = false;

        });

    }

    getValues(){

        let user = {};

        let isValid = true;

        // pegando o campos do fomularios
        [...this.formEl.elements].forEach( (field, index)=>{

            if(["nomeProduto", "valorDoProduto"].indexOf(field.name) > -1 && !field.value){

                field.parentElement.classList.add('has-error');
                isValid = false;

            }

            user[field.name] = field.value;

        });

        if(!isValid){
            return false;
        }

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
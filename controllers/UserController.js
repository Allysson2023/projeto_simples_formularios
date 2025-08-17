class UserController{

    // pegando o id do formularios
    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selactAll();
    };

    onEdit(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener("submit", evento=>{
            evento.preventDefault();
            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let userData = this.getValues(this.formUpdateEl);
            if(!userData){
                btn.disabled = false;
                alert("Preencha o formulario!")
                return;
            }

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let user = new User();

            user.loadFromJSON(userData);

            this.getTr(user, tr);

            btn.disabled = false;

            this.formUpdateEl.reset();

            this.showPanelCreate();

            
        });

    }


    // methodo do butao submit para envia o formulario
    onSubmit(){

        // pegando os dados do Formulario...
        this.formEl.addEventListener("submit", evento =>{

            // preventeDefault -> é para não atualiza a pagina...
            evento.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let userData = this.getValues(this.formEl);
            if(!userData){
                btn.disabled = false;
                alert("Preencha o formulario!")
                return;
            }

            this.insert(userData);

            this.addLine(userData);

            this.formEl.reset();

            btn.disabled = false;

        });

    }

    getValues(formEl){

        let user = {};

        let isValid = true;

        // pegando o campos do fomularios
        [...formEl.elements].forEach( (field, index)=>{

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

    getUserStorage(){
        let users = [];
    
        if(localStorage.getItem("user")){
            users = JSON.parse(localStorage.getItem("user"));
        }
        return users;

    }

    // lista todos os dados que ja estao no sessionStorage
    selactAll(){
        let users = this.getUserStorage();

        users.forEach(dataUser=>{

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user);

        });

    }

    // Salvando no sessionStorage
    insert(data){

        let users = this.getUserStorage();

        users.push(data);

        //sessionStorage.setItem("user", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(users));

    }

    // adicionando uma linha na tabela...
    // data é objeto da class => representa a class
    addLine(dataUser){


        let tr = this.getTr(dataUser);
        
        this.tableEl.appendChild(tr);
        
        
    };
    
    // criando o modelo do html
    // pegando o Id da tabela tbody para coloca o html
    getTr(dataUser, tr = null){

        if(tr == null) tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
                <td>${dataUser.nomeProduto}</td>
                <td>${dataUser.valorDoProduto}</td>
                <td>
                    <button class="btn-editar btn-edt ">Editar</button>
                    <button class="btn-delete btn-delete">Excluir</button>
                </td>
        `;
        this.addEventsTr(tr);
        return tr;
    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e=>{

            if(confirm("Deseja Realmente Excluir?")){

                tr.remove();

            }

        });

        tr.querySelector(".btn-edt").addEventListener("click", e=>{
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#formularioIdUpdate");

            form.dataset.trIndex = tr.sectionRowIndex;

            for(let nome in json){

                let field = form.querySelector("[name=" + nome.replace("_","") + "]");

                if(field){
                    field.value = json[nome]
                }


            }


            this.showPanelUpdate();
            
        });
    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    };
    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    };

}
class DropBoxController {

    constructor() {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root'); //carregando os elementos do formulario html
        this.initEvents();

    } //fechando o constructor()

    initEvents() {

        this.btnSendFileEl.addEventListener('click', event => { //para enviar o arquivo

            this.inputFilesEl.click();

        });
        this.inputFilesEl.addEventListener('change', event => {

            this.uploadTask(event.target.files);
            this.snackModalEl.style.display = 'block'; //para dar display na barra de carregamento

        });

    } //fechando o initEvents()

    uploadTask(files) {

        let promises = [];
        [...files].forEach(file => { //para cada arquivo cria uma promessa com envio ajax para o db

            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');
                ajax.onload = event => {

                    try {

                        resolve(JSON.parse(ajax.responseText));
                
                    } catch (e) {

                        reject(e);

                    }

                };
                ajax.onerror = event => {

                    reject(event);

                };
                let formData = new FormData();
                formData.append('input-file', file); //criando o formulário que será enviado pelo ajax com o arquivo
                ajax.send(formData);

            }));

        });
        return Promise.all(promises); //executa todas as promessas do array

    } //fechando o uploadTask()

} //fechando a classe DropBoxController
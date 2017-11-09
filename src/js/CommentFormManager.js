const $ = require("jquery");

import UIManager from './UIManager';

export default class CommentFormManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            this.validateAndSendData();
            // en jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de evento
            return false; // == event.preventDefault();
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }
    }

    isValid() {
        const inputs = this.element.find("input");
        for (let input of inputs) {
            if (input.checkValidity() == false ) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
            if ($("input[id=comment_text]").val().split(" ").length > 120){
                const errorMessage = "Máximo 120 palabras";
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        // Llegamos aquí, si no hay ningún error
        this.setIdeal(); 
        return true;
    }

    send() {
        this.setLoading();
        const comment = {
            author: this.element.find("#author").val(),
            email: this.element.find("#email").val(),
            text: this.element.find("#comment_text").val()
        };
        this.commentsService.save(comment, success => {
            this.pubSub.publish("new-comment", comment); // publicamos el evento que informa de la creación de una canción 
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar el comentario en el servidor.");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

}
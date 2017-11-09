const $ = require("jquery");

export default class CommentsService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado de comentarios
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar comentario
    save(comment, successCallback, errorCallback) {
        if (comment.id) {
            this.update(comment, successCallback, errorCallback);
        } else {
            this.create(comment, successCallback, errorCallback);
        }
    }

    // Crear un comentario
    create(comment, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: comment,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de comentario
    getDetail(commentId, successCallback, errorCallback) {
        $.ajax({
            url: '${this.url}${commentId}',
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una comentario
    update(comment, successCallback, errorCallback) {
        $.ajax({
            url: '${this.url}${comment.id}',
            method: "put",
            data: comment,
            success: successCallback,
            error: errorCallback
        })
    }

    // Borrar un comentario (commentsService.delete(4, response => {}, error => {}))
    delete(commentId, successCallback, errorCallback) {
        $.ajax({
            url: '${this.url}${commentId}',
            method: "delete", // método HTTP a utilizar
            success: successCallback,
            error: errorCallback
        })
    }

}
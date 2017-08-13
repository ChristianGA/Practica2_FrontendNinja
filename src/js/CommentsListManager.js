import UIManager from './UIManager';

export default class CommentsListManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        this.loadComments();
        let self = this;
        this.element.on("click", ".comment", function() {
            let commentId = this.dataset.id;
            self.deleteComment(commentId);
        });
        this.pubSub.subscribe("new-comment", (topic, comment) => {
            this.loadComments();
        });
    }

    loadComments() {
        this.commentsService.list(comments => {
            // Comprobamos si hay comentarios
            if (comments.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                // Componemos el HTML con todas las canciones
                this.renderComments(comments);
                // Quitamos el mensaje de cargando y mostramos la lista de comentarios
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            // Hacemos log del error en la consola
            console.error("Error al cargar los comentarios", error);
        });
    }

    renderComments(comments) {
        let html = "";
        for (let comment of comments) {
            html += this.renderComment(comment);
        }
        // Metemos el HTML en el div que contiene los comentarios
        this.setIdealHtml(html);
    }

    renderComment(comment) {
        return `<article class="comment" data-id="${comment.id}">
                <div class="title_comment">${comment.title}</div>
                <div class="author_comment">${comment.author}</div>
                <div class="email_comment">${comment.email}</div>
                <div class="text_comment">${comment.text}</div>
            </article>`;
    }

    deleteComment(commentId) {
        this.setLoading();
        this.commentsService.delete(commentId, success => {
            this.loadComments();
        }, error => {
            this.setError();
        })
    }

}
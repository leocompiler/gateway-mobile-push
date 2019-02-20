export class NegocioException extends Error {
    constructor(message, status) {
        super();
        this.name = "NegocioException";
        this.message = message;
        this.status = status || 400;
    }
}
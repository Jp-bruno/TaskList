export default class ItemProps {
    constructor(titulo = '', descricao = '', dataFinal = ['', ''], dataInicio = ['', ''], complete = false) {
        this.titulo = titulo
        this.descricao = descricao
        this.dataInicio = dataInicio
        this.dataFinal = dataFinal
        this.complete = complete
    }
}
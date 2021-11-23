export default class ItemProps {
    constructor(titulo = '', descricao = '', dataFinal = ['1', '1'], dataInicio = ['', ''], complete = false) {
        this.titulo = titulo
        this.descricao = descricao
        this.dataInicio = dataInicio
        this.dataFinal = dataFinal
        this.complete = complete
    }
}
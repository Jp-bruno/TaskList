import { useContext } from "react";
import { listContext } from "../../context/listContext";
 
export default function SaveButton({disableSaveButton}) {
    const context = useContext(listContext);

    function salvarAlteracoesDescricao() {
        context.updateItemDescription()
        disableSaveButton()
    }

    return(
        <>
            <button id='saveButton' onClick={salvarAlteracoesDescricao}>Salvar</button>
        </>
    )
}
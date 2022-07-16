import { listContext } from "../../context/listContext";
import { useContext, useEffect, useState } from 'react';
import TaskSettings from "./taskSettings";


export default function TaskDisplay() {
    const [state, setState] = useState({
        contentChanged: false,
    })

    const context = useContext(listContext);

    function watchChange() {
        setState({
            ...state,
            contentChanged: true
        })
    }

    function disableSaveButton() {
        setState({
            ...state,
            contentChanged: false
        })
    }

    function isReadOnly() {
        return context.selectedItem.complete ? true : false;
    }

    useEffect(() => { //faz o botao de salvar sumir quando outra tarefa é selecionada no meio de uma edição de descrição de tarefa
        return context.someSelected ? disableSaveButton() : () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.selectedItem, context.someSelected])

    return (
        <>
            <section id='taskSection' className={`${context.modalOpen ? 'modal_open' : 'modal_closed'}`}>
                <button className='close_modal_button' onClick={context.toggleModal}>
                    X
                </button>

                <textarea
                    onChange={watchChange}
                    id='taskDescriptionArea'
                    placeholder={context.selectedItem?.complete ? 'Tarefa concluída!' : (context.selectedItem ? 'Descreva sua tarefa.' : 'Selecione uma tarefa.')}
                    readOnly={context.someSelected ? isReadOnly() : true}
                />

                {
                    context.someSelected ?
                        <TaskSettings
                            hasChange={state.contentChanged}
                            disableSaveButton={disableSaveButton}
                        />
                        :
                        null
                }
            </section>
        </>
    )

}
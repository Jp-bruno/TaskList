import { listContext } from "../../context/listContext";
import { useContext, useEffect, useState } from 'react';
import TaskSettings from "./taskSettings";


export default function TaskDisplay() {
    const context = useContext(listContext);

    const [state, setState] = useState({
        contentChanged: false,
        hasCompleted: false
    })

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

    function disableCompleteButton() {
        setState({
            ...state,
            hasCompleted: true
        })
    }

    useEffect(() => {
        return context.someSelected ?
        setState({
            hasCompleted: context.selectedItem.complete,
            contentChanged: false
        })

        :

        () => {}
    }, [context.selectedItem, context.someSelected ? context.selectedItem.complete : null])

    return (
        <>
            <section id='taskSection'>
                <textarea
                    onChange={watchChange}
                    id='taskDescriptionArea'
                    placeholder={(context.selectedItem ? 'Descreva sua tarefa.' : 'Selecione uma tarefa.')}
                    readOnly={(context.someSelected ? false : true)}
                />

                {
                    context.someSelected ?
                        <TaskSettings
                            hasChange={state.contentChanged}
                            hasCompleted={state.hasCompleted}
                            disableSaveButton={disableSaveButton}
                            disableCompleteButton={disableCompleteButton} />
                        :
                        null
                }
            </section>
        </>
    )
}
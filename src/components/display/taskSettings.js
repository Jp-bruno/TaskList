import SaveButton from "./saveButton";
import CompleteTask from "./completeTaskButton";
import { useContext, useState } from "react";
import { listContext } from "../../context/listContext";

export default function TaskSettings({ disableSaveButton, hasChange, hasCompleted, disableCompleteButton }) {
    const context = useContext(listContext);

    return (
        <>
            <div id='taskSettingsOnDisplay'>
                <div id='taskTimeData'>
                    <p>Criado em: <span>{context.selectedItem.dataInicio[0]}</span> {context.selectedItem.dataInicio[1] ? 'às' : ''} <span>{context.selectedItem.dataInicio[1]}</span></p>
                    {
                        hasCompleted ?
                            <p>Finalizado em: <span>{context.selectedItem.dataFinal[0]}</span> {context.selectedItem.dataFinal[1] ? 'às' : ''} <span>{context.selectedItem.dataFinal[1]}</span></p>
                            :
                            null
                    }
                </div>

                {
                    hasCompleted ?
                        null
                        :
                        <div id='saveOrComplete'>
                            {hasChange ? <SaveButton disableSaveButton={disableSaveButton} /> : null}
                            <CompleteTask />
                        </div>
                }
            </div>
        </>
    )
}
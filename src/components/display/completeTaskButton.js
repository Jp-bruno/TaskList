import { useContext } from "react"
import { listContext } from "../../context/listContext"

export default function CompleteTask() {
    const context = useContext(listContext)
    return (
        <>
            <button id='completeTaskButton' onClick={context.completeTask}>Completar tarefa</button>
        </>
    )
}
import {useContext} from 'react';
import { listContext } from "../../context/listContext";

export default function AddItemButton() {
    const context = useContext(listContext)
    
    return(
        <div id='newListItem'>
            <input id='newTaskInput' placeholder='Nova tarefa' onKeyDown={context.addItem}/>
        </div>
    )
}
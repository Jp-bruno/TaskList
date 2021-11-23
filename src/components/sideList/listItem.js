import RemoveItem from './removeItem';
import EditItemTitle from './editItemTitle';
import { useState } from 'react';
import { useContext } from 'react';
import { listContext } from "../../context/listContext";


export default function ListItem({ children, indexId }) {
    const [state, setState] = useState({
        editMode: false,
    })

    const context = useContext(listContext)

    function changeMode(ev) {
        if (ev.key === 'Enter' && state.editMode) {
            let input = document.getElementById(`newTitleInput${indexId}`);

            if (input.value === '') {
                return
            }

            setState({
                ...state,
                editMode: !(state.editMode)
            })

            context.updateItemTitle(ev)
        } else

            if (ev.key === 'Escape' && state.editMode) {
                console.log(context.selectItem.titulo)

                setState({
                    ...state,
                    editMode: false
                })
            } else

                if (ev.type === 'click' && state.editMode == false) {
                    let itemTitle = document.getElementById(`titulo${indexId}`).innerText;

                    context.selectItem(itemTitle)

                    setTimeout(() => document.getElementById(`newTitleInput${indexId}`).focus(), 50)

                    setState({
                        ...state,
                        editMode: !(state.editMode)
                    })
                } else

                    if (ev.type === 'blur') {
                        setState({
                            ...state,
                            editMode: !(state.editMode)
                        })
                    }
    }

    return (
        <>
            <li className={`listItem`} id={`item${indexId}`} key={indexId}>
                {
                    state.editMode ?
                        <>
                            <input maxLength={50} id={`newTitleInput${indexId}`} className='newTitleInput' onKeyDown={changeMode} onBlur={changeMode} />
                        </>
                        :
                        <>
                            <p id={`titulo${indexId}`} onClick={context.selectItem}>{children}</p>
                            <div id='editOrRemoveDiv'>
                                <EditItemTitle indexId={indexId} changeMode={changeMode} />
                                <RemoveItem indexId={indexId} />
                            </div>
                        </>
                }
            </li>
        </>
    )
}
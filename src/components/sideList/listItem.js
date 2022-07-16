import RemoveItem from './removeItem';
import EditItemTitle from './editItemTitle';
import { useState, useContext, useRef, useEffect } from 'react';
import { listContext } from "../../context/listContext";

export default function ListItem({ children, indexId, complete }) {
    const [state, setState] = useState({
        editMode: false
    })

    const ItemRef = useRef();
    const InputRef = useRef();

    const context = useContext(listContext)

    function toggleEditMode() {
        setState({
            ...state,
            editMode: !(state.editMode)
        })
    }

    function handleInput(ev) {
        if (ev.key === 'Enter' && state.editMode) {
            if (InputRef.current.value === '') {
                toggleEditMode();
                return
            }

            context.updateItemTitle(InputRef.current.value);
            toggleEditMode();

        } else if ((ev.key === 'Escape' && state.editMode) || ev.type === 'blur') {
            toggleEditMode();
        }
    }

    function select() {
        context.selectItem(children, ItemRef.current)
    }

    function enterEditMode() {
        select();
        toggleEditMode();
        setTimeout(() => { InputRef.current.focus() }, 50);
    }


    return (
        <>
            <li className={`listItem ${complete ? 'completed' : ''}`} id={`item${indexId}`} key={indexId} ref={ItemRef}>
                {
                    state.editMode ?
                        <>
                            <input maxLength={50} id={`newTitleInput${indexId}`} className='newTitleInput' ref={InputRef} onKeyDown={handleInput} onBlur={toggleEditMode} />
                        </>
                        :
                        <>
                            <p id={`titulo${indexId}`} onClick={select}>{children}</p>
                            <div id='editOrRemoveDiv' className={complete ? 'complete' : null}>
                                {complete ? null : <EditItemTitle indexId={indexId} enterEditMode={enterEditMode} />}
                                <RemoveItem indexId={indexId} />
                            </div>
                        </>
                }
            </li>
        </>
    )
}
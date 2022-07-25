import { createContext, useState } from "react";
import ItemProps from "./itemProps";

export const listContext = createContext({});

export default function ListContextProvider({ children }) {
    const [state, setState] = useState({
        items: [],
        selectedItem: null,
        someSelected: false,
        completedTasks: [],
        modalOpen: false
    })

    //funções auxiliares

    function writeOnDisplay(content = '') {
        let textarea = document.getElementById("taskDescriptionArea")

        textarea.value = content
    }

    function getFullDate() {
        const today = new Date()

        const dayMonthYear = today.toLocaleDateString()

        const hourMin = today.toTimeString().slice(0, 8)

        return [dayMonthYear, hourMin]
    }

    //funções da aplicação

    function addItem(ev) {
        if (ev.key === 'Enter') {
            const input = document.getElementById('newTaskInput');

            if (input.value === '' || state.items.find(el => el.titulo === input.value)) {
                return
            }

            const [dmy, hms] = getFullDate();

            let newItem = new ItemProps(input.value, '', '', [dmy, hms])

            let newArray = [...state.items, newItem];

            setState({
                ...state,
                items: newArray,
                someSelected: state.someSelected ? true : false
            })

            input.value = ''
        }
        return
    }

    function removeItem(ev) {
        const targetIndex = Number(ev.target.id.slice(6));

        const newItemsArray = [...state.items];

        newItemsArray.splice(targetIndex, 1);

        setState({
            ...state,
            selectedItem: newItemsArray.length === 0 ? null : newItemsArray[newItemsArray.length - 1],
            items: newItemsArray,
            someSelected: newItemsArray.length === 0 ? false : true
        })

        writeOnDisplay();
    }

    function selectItem(text, itemReference, eventTargetType) {
        if (state.selectedItem?.titulo === text) {
            setState({
                ...state,
                someSelected: true,
                modalOpen: eventTargetType === 'submit' ? false : true
            })
            return
        }

        let oItem = state.items.find(el => el.titulo === text);

        if (state.someSelected) { //para nao perder o que foi escrito antes de mudar para outro item sem ter salvo
            updateItemDescription();
        }

        let allListItems = Array.from(document.querySelectorAll('.listItem'));

        allListItems.forEach(el => el.classList.contains('selected') ? el.classList.remove('selected') : () => { })

        itemReference.classList.add('selected')

        setState({
            ...state,
            selectedItem: oItem,
            someSelected: true,
            modalOpen: eventTargetType === 'submit' ? false : true
        })

        writeOnDisplay(oItem.descricao)
    }

    function updateItemTitle(newTitle) {
        let newArray = state.items.map((el) => {
            if (el.titulo === state.selectedItem.titulo) {
                el.titulo = newTitle
                return el
            } else {
                return el
            }
        })

        setState({
            ...state,
            items: newArray
        })
    }

    function updateItemDescription() {
        let textarea = document.getElementById('taskDescriptionArea');

        if (textarea.value === state.selectedItem.descricao) {
            return
        } else {
            let newArray = state.items.map(el => {
                if (state.someSelected && (el.titulo === state.selectedItem.titulo)) {
                    el.descricao = textarea.value;
                    return el
                }
                return el
            })

            setState({
                ...state,
                items: newArray
            })
        }
    }

    function completeTask() {
        let itemIndex = state.items.findIndex(el => el.titulo === state.selectedItem.titulo);

        updateItemDescription();

        let newArray = state.items.map(el => {
            if (el.titulo === state.selectedItem.titulo) {
                el.complete = true;
                el.dataFinal = getFullDate();
                return el
            }
            return el
        })

        setState({
            ...state,
            items: newArray,
            selectedItem: newArray[itemIndex],
            completedTasks: [...state.completedTasks, newArray[itemIndex]]
        })
    }

    function toggleModal() {
        setState({
            ...state,
            modalOpen: !(state.modalOpen)
        })
    }

    return (
        <listContext.Provider
            value={
                {
                    items: state.items,
                    selectedItem: state.selectedItem,
                    someSelected: state.someSelected,
                    modalOpen: state.modalOpen,
                    removeItem,
                    addItem,
                    selectItem,
                    updateItemTitle,
                    updateItemDescription,
                    completeTask,
                    toggleModal
                }
            }>
            {children}
        </listContext.Provider>
    )
}




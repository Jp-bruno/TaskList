import { createContext, useState } from "react";
import ItemProps from "./itemProps";

export const listContext = createContext({});

export default function ListContextProvider({ children }) {
    const [state, setState] = useState({
        items: [new ItemProps('Encontro com aliens', 'Ser abduzido', '', getFullDate())],
        selectedItem: null,
        someSelected: false,
        completedTasks: []
    })

    //funções auxiliares

    function writeOnDisplay(content = '') {
        let textarea = document.getElementById("taskDescriptionArea")

        textarea.value = content
    }

    function getFullDate() {
        let today = new Date()

        let dayMonthYear = today.toLocaleDateString()

        let hourMin = today.toTimeString().slice(0, 8)

        return [dayMonthYear, hourMin]
    }

    //funções da aplicação

    function addItem(ev) {
        if (ev.key === 'Enter') {
            let input = document.getElementById('newTaskInput');

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
        let targetIndex = Number(ev.target.id.slice(6));

        let newItemsArray = [...state.items];

        newItemsArray.splice(targetIndex, 1);

        setState({
            ...state,
            selectedItem: newItemsArray.length === 0 ? null : newItemsArray[newItemsArray.length - 1],
            items: newItemsArray,
            someSelected: newItemsArray.length === 0 ? false : true
        })

        writeOnDisplay('');
    }

    function selectItem(text, itemReference) {
        if (state.selectedItem?.titulo === text) {
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
            someSelected: true
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

    //funções para tarefas completas

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

    return (
        <listContext.Provider
            value={
                {
                    items: state.items,
                    selectedItem: state.selectedItem,
                    someSelected: state.someSelected,
                    removeItem,
                    addItem,
                    selectItem,
                    updateItemTitle,
                    updateItemDescription,
                    completeTask
                }
            }>
            {children}
        </listContext.Provider>
    )
}




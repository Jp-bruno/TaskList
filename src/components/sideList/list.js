import ListItem from "./listItem";
import AddItemButton from "./addItem";
import { useContext } from 'react';
import { listContext } from "../../context/listContext";

export default function List() {
    const context = useContext(listContext)

    return (
        <>
            <ul id='list'>
                {
                    context.items ? context.items.map((el, index) => {
                        return (
                            <ListItem
                                key={index}
                                selectItem={context.selectItem}
                                removeItem={context.removeItem}
                                editItem={context.editItem}
                                indexId={index}
                            >
                                {el.titulo}
                            </ListItem>
                        )
                    })

                        :

                        null
                }

                <AddItemButton key='last' />
            </ul>
        </>
    )
}
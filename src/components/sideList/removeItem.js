import { useContext } from 'react';
import { listContext } from '../../context/listContext';

export default function RemoveItem({indexId}) {
    const context = useContext(listContext);

    return(
        <button id={'remove' + indexId} className='remove_item_list_button' onClick={context.removeItem}>
            <svg width="13" height="13" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.05055 1L16 16M15.9495 1L1 16" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </button>
    )
}
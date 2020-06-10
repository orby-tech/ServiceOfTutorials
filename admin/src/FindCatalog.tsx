import React, {useState} from "react";
import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'


interface FindFormProps{
    onAdd(title:string): void,
    strings: string
  }
export const FindForm: React.FC<FindFormProps> = props => {
    const [find, setFind] = useState<string>('');

    const findEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAdd(event.target.value)
        setFind(event.target.value)
    }
    return(
        
        <>
            <div className="catalog__header-find-group"> {props.strings} </div>
            <input 
                onChange={findEvent}
                value={find}
                className="form-control catalog__input-find-group"
                id="catalog__input-find-group" />

        </>
        
    )
}
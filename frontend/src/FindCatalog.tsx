import React, {useState} from "react";

interface FindFormProps{
    onAdd(title:string): void
  }
export const FindForm: React.FC<FindFormProps> = props => {
    const [find, setFind] = useState<string>('');


    const findEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFind(event.target.value)
    }
    const keyUpHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter"){
            props.onAdd(find)
            setFind("")
        }
    }
    return(
        <>
            <div className="catalog__header-find-group"> Найти в каталоге: </div>
            <input 
                onChange={findEvent}
                onKeyUp={keyUpHandler}
                value={find}
                className="form-control catalog__input-find-group"
                id="catalog__input-find-group" />
        </>
    )
}
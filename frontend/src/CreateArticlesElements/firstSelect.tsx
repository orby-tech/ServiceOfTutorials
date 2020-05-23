import React, {useState} from "react";

interface FindFormProps{
    firstChange(title:string): void;
    catalog: any[]
  }
export const FirstSelect: React.FC<FindFormProps> = props => {
    const [find, setFind] = useState<string>('');


    const first_change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.firstChange(event.target.value)
    }
    return(
        <>
            <select  className="custom-select mr-sm-2 create-article__input" 
                    id = "inlineFormCustomSelect create-article__input" 
                    onChange={first_change}>
                <option value="selected">Направление</option>

                {props.catalog.map( global  =>
                    <option value={global[0]}>{global[0]}</option>
                )}
            </select>
        </>
    )
}
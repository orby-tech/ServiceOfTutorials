import React from "react";

interface FindFormProps{
    secondChange(title:string): void;
    catalog: any[]
  }
export const SecondSelect: React.FC<FindFormProps> = props => {
    let styleOfSecondChange : string  = props.catalog.length !== 0
                      ? "custom-select mr-sm-2 create-article__input" 
                      : "create-article__non-display"

    const first_change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.secondChange(event.target.value)
    }
    return(
        <>
            <select  className={styleOfSecondChange}
                        id = "inlineFormCustomSelect create-article__input" 
                        onChange={first_change}>
                <option value="selected">Тема</option>

                {props.catalog.map( global  =>
                    <option value={global[0]}>{global[0]}</option>
                )}
            </select>
        </>
    )
}
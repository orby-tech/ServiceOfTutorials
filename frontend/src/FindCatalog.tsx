import React, {useState} from "react";

export const FindForm: React.FC = () => {
    return(
        <>
            <div className="catalog__header-find-group"> Найти в каталоге: </div>
            <input className="form-control catalog__input-find-group"
                    id="catalog__input-find-group" />
            <button className="form-control catalog__button-find-group"
                    onClick={this.findClick}>
            Найти
            </button>
        </>
    )
}
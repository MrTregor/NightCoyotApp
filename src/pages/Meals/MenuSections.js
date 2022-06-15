import React from "react";


export const MenuSections = ({sectionRows}) => {
    console.log("Section: ")
    console.log(sectionRows)
    return <div>
        <main className={"firstElement"}/>
        <div className={'d-flex justify-content-center flex-column'}>
            {sectionRows}
        </div>
    </div>;
}

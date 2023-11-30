import React from "react";
import { useState, useEffect } from "react";
import CountrySelect from "./countrySelect";
import { PatternFormat} from "react-number-format"; // Lib pour les formats de numéro de téléphone

const userInfoComponent = ({userInfo}) => {

    const orderedData = {
        "Prénom": userInfo.first_name,
        "Nom": userInfo.last_name,
        "Email": userInfo.email,
        "Numéro de Téléphone": userInfo.phone_number,
        "Mot de passe": userInfo.password,
        "Adresse": userInfo.address,
        "Ville": userInfo.city,
        "Pays": userInfo.country,
        "Code Postal": userInfo.postal_code,
    }

    return (
        <div>
            <div className={"center col"}>
                {Object.keys(orderedData).map((key) => (
                    <div className={"fill"}>
                        <label>{key}</label>
                        {key === "Pays" ? < CountrySelect /> :
                            key === "Numéro de Téléphone" ? <PatternFormat
                                    format="+1 (###)-####-###"
                                    placeholder={orderedData[key]}
                                    name={"phone_number"}
                                    required
                                /> :
                                key === "Email" ? <input type={"email"} placeholder={orderedData[key]} disabled={true} /> :
                            <input
                                type={key === "Mot de passe" ? "password" : key === "Numéro de Téléphone" ? "tel" : "text"} placeholder={ key === "Mot de passe" ? "************" : orderedData[key]}>
                            </input>}

                    </div>
                ))}

            </div>
        </div>
    )
}

export default userInfoComponent;
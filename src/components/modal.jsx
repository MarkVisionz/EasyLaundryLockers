import React, { useState } from "react";
import "../css/modal.css"


function modalBody() {

    return(
        <>
            <div className="modal">
                <form className="form">
                    <div className="payment--options">
                        <button name="paypal"></button>
                    </div>
                    <div className="separator">
                        <hr className="line"/>
                        <p>or pay using credit card</p>
                        <hr className="line"/>
                    </div>

                    <div className="credit-card-info--form">
                        <div className="input_container">
                            <label for="password_field" className="input_label">Card Holder Full Name</label>
                            <input id="password_field" className="input_field" placeholder="Enter your full name" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default modalBody;
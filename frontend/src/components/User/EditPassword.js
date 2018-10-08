import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { returnPayloadId } from './../Login/AuthStorage'
import { updatePassword } from './API'
import { returnPayloadEmail } from './../Login/AuthStorage'
import config from './../../config'



class EditUser extends Component {

    
    state = {
        user:{
        password_new: null,
        password_old: null,
        password_confirm: null

        },
        validate_pass: false,
        logged: false,
        error:''
    }

    static displayName = 'ui-LoginForm'

    hanlePasswordChange = ({ target }) => {
        const { password_old, value } = target;
        const { user } =   this.state;
        
        this.setState(password_old, () => {
            user.password_old = value;
        });
        
    }

    hanlePasswordChangeNew = ({ target }) => {
        const { password_new, value } = target;
        const { user } =   this.state;
        
        this.setState(password_new, () => {
            user.password_new = value;
        });
        
    }

    hanlePasswordConfirmChange = ({ target }) => {
        const { password_confirm, value } = target;
        const { user } =   this.state;
        
        this.setState(password_confirm, () => {
            user.password_confirm = value;
        });
    }

    //Redirect the user for GET user page
    redirectPage() {
        window.location.href = config.URL_LOCAL+'/user'
        
    }

    validarSenha = () => {
        const change = this.state.user
        if(change.password_new === change.password_confirm){
            this.setState({
                validate_pass: true
            })
        }else{
            this.setState({
                validate_pass: false
            })
            alert("The password are not the same")
            return 
        }
    }

    
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.validarSenha()
        try {
        
        const email_send = returnPayloadEmail()
        const password_toSend = this.state.user
         //Dates to Login
         let dataToSend = {
            user: {
                email: email_send,
                password: this.state.user.password_old
            }
        }
        
        if(dataToSend.user.email === null || dataToSend.user.password === null ||
            password_toSend.password_confirm === null || password_toSend.password_new === null){

            return alert("Campos obrigatorios de Senha")

        }else if(this.state.validate_pass === false){
            return
         }else{
        
        //URL for authentication
        let url = 'http://localhost:4000/users/auth'


        //Route from the Login to the Backend
        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(responseJson => {
                //Change the Success State for true and set a Token in Local Storage
                if (responseJson.success) {
                    
                    this.setState({
                        logged: true,
                        error: undefined
                    })
                    if(this.state.logged){
                        const payloadId = returnPayloadId()
                        const password = this.state.user.password_new
                        const { data } =  updatePassword(payloadId, password);
                        this.redirectPage()
                        
                        return data;
                    }
                    
                }else{
                   alert("Password invalid")
                }
            }).catch(err => this.setState({ error: err }))
        }
        
        } catch (error) {
            
             return error
        }
    
    }

    render() {
        
        
        return (
                <div className="row" style={{ paddingTop: '50px' }}>
                <div className="col">
                </div>
                <div className="col">
                    <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <div className="card-body">
                            <form>
                                <div className="page-header">
                                    <h1>Edit Password</h1>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" onChange={this.hanlePasswordChange} className="form-control" id="password" placeholder="Old Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">New Password</label>
                                    <input type="password" onChange={this.hanlePasswordChangeNew} className="form-control" id="password-new" placeholder="New Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1"> Confirm Password</label>
                                    <input type="password" onChange={this.hanlePasswordConfirmChange} className="form-control" id="password-confirm" placeholder="Confirm Password"/>
                                </div>
                                <button type="submit" onClick={this.handleSubmit} className="btn btn-secondary btn-block">Submit</button>
                                <br />
                                
                            </form>


                        </div>
                    </div>

                </div>
                <div className="col"/>
            </div>

    )}
}

export default withRouter(EditUser)
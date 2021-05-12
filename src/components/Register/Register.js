import React from 'react';
import { Form, Field } from 'react-final-form'

class Register extends React.Component {
    constructor(props) {
        super();
        this.state= {
            Email: '',
            Password: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPassWordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignin = (values) => {
        fetch('https://mysterious-scrubland-92986.herokuapp.com/register', {
            method: 'post',
            headers: {'content-Type' : 'application/json'},
            body:JSON.stringify({
                email: values.email,
                password: values.password,
                name: values.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }else{
                alert('something went wrong please try again with a different email') 
            }
        })
        .catch(err => {
            alert('something went wrong please try again')
        })
        
    }
    render(){
        return (
            <article className="br3 ba b--near-white mv4 w-100 w-50-m w-25-l mw0 shadow-5 center near-white">
                <main className="pa4 black-80 near-white">
                    <div className="measure">
                        <Form
                            onSubmit={this.onSubmitSignin}
                            validate={values => {
                                const errors = {}
                                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
                                if (!values.name || (values.name && values.name.length < 2)) {
                                errors.name = 'Name is too short'
                                }
                                if (!values.password || (values.password && values.password.length < 4)) {
                                errors.password = 'password must be atleast 4 characters'
                                }
                                if (!values.email || (values.email && !regex.test(values.email))) {
                                errors.email = 'Invalid Email'
                                }
                                return errors
                            }}
                            render={({ handleSubmit, form, reset, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                                        <Field name="name">
                                            {({ input, meta }) => (
                                            <div className="mt3">
                                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                                <input 
                                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 near-white" 
                                                    type="Text" 
                                                    name="name"  
                                                    id="name" 
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <span className="red">{meta.error}</span>}
                                            </div>
                                            )}
                                        </Field>
                                        <Field name="email">
                                            {({ input, meta }) => (
                                                <div className="mt3">
                                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                                    <input 
                                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 near-white" 
                                                        type="email" 
                                                        name="email-address"  
                                                        id="email-address" 
                                                        {...input}
                                                    />
                                                    {meta.error && meta.touched && <span className="red">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ input, meta }) => (
                                                <div className="mv3">
                                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                                    <input 
                                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 near-white" 
                                                        type="password" 
                                                        name="password"  
                                                        id="password" 
                                                        {...input}
                                                    />
                                                    {meta.error && meta.touched && <span className="red">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>                                        
                                        <div>
                                            <button  className="b ph3 pv2 input-reset ba b--near-white bg-transparent grow pointer f6 dib near-white"  type="submit" disabled={submitting}>
                                                Register
                                            </button>
                                        </div>
                                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                                    </fieldset>
                                </form>
                            )}
                        />
                    </div>
                </main>
            </article>
        );

    }
    
}

export default Register;
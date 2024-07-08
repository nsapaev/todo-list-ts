import React, { ChangeEvent } from 'react';
import { useState } from 'react';

interface RegisterAndLoginFormProps {
    title: string;
    onSubmitHandler: (email: string, password:string) => void;
}

const RegisterAndLoginForm: React.FC<RegisterAndLoginFormProps> = React.memo(({ title, onSubmitHandler }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    
    };

    return (
        <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
        <form style={{display: "flex", flexDirection: "column", gap: "15px" }}>
            <h2>{title}</h2>
            <label>
                Email
                <input type="email" name='email' value={email} onChange={onChangeEmailHandler} required autoComplete="username" />
            </label>
            <label>
                Password
                <input type="password" name='password'  value={password} onChange={onChangePasswordHandler} autoComplete="current-password" />
            </label>
            <button type="button" onClick={()=> {onSubmitHandler(email,password)}}>
                Submit
            </button>
        </form>
        </div>
    );
});

export default RegisterAndLoginForm;

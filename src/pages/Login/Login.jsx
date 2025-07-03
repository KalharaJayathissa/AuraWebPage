import './Login.css';

export default function Login() {
    return(
        <div className='container'>
            <div className ="box">
                <div>
                    User name:   
                    <input type='text'></input>
                </div>
                <div>
                    Password   :   
                    <input type="password" />
                </div>
                <button>Log in</button>
            </div>

            
        </div>  


    );


}
import GoogleLogin from 'react-google-login';
import { ReactComponent as GoogleIcon } from "@approbado/lib/icons/GoogleIcon.svg"
import { useHistory } from 'react-router-dom'
import { set } from '../store/formFiller'
import { useDispatch } from "react-redux";
import axios from 'axios'

const GoogleLoginButton = ({ className }) => {
    const history = useHistory()
    const dispatch = useDispatch();

    const processResponse = response => {
        const { name, email, googleId } = response.profileObj;

        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/external`, {
            email: email,
            provider: 'google',
            key: googleId
        })
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
            }).catch(err => {
                if (err.response.status === 422) {
                    dispatch(set({
                        email: email,
                        provider: 'google',
                        key: googleId,
                        names: name
                    }))

                    return history.push('/register');
                }
            });
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            render={renderProps => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={className}
                >
                    <GoogleIcon style={{ marginRight: '0.5rem' }} />
                    Google
                </button>
            )}
            onSuccess={processResponse}
            onFailure={processResponse}
            cookiePolicy={'single_host_origin'}
            type="button"
        />
    )
}

export default GoogleLoginButton

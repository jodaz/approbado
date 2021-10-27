import GoogleLogin from 'react-google-login';
import { ReactComponent as GoogleIcon } from "@approbado/lib/icons/GoogleIcon.svg"

const GoogleLoginButton = ({ className }) => {
    const processResponse = (response) => {
        console.log(response)
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
        />
    )
}

export default GoogleLoginButton

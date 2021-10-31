import FacebookLogin from 'react-facebook-login'
import axios from 'axios'
import { ReactComponent as FacebookIcon } from "@approbado/lib/icons/FacebookIconOutline.svg"
import { useHistory } from 'react-router-dom'
import { set } from '../store/formFiller'
import { useDispatch } from "react-redux";

const FBLoginButton = ({ className }) => {
    const history = useHistory()
    const dispatch = useDispatch();

    const processResponse = response => {
        const { name, email, userID } = response;

        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/external`, {
            email: email,
            provider: 'facebook',
            key: userID
        })
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
            }).catch(err => {
                if (err.response.status === 422) {
                    dispatch(set({
                        email: email,
                        provider: 'facebook',
                        key: userID,
                        names: name
                    }))

                    return history.push('/register');
                }
            });
    }

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FB_ID}
            autoload={true}
            fields='name,email'
            callback={processResponse}
            icon={<FacebookIcon style={{ marginRight: '0.5rem' }} />}
            textButton='Facebook'
            cssClass={className}
        />
    )
}

export default FBLoginButton

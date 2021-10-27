import FacebookLogin from 'react-facebook-login'
import { ReactComponent as FacebookIcon } from "@approbado/lib/icons/FacebookIconOutline.svg"

const FBLoginButton = ({ className }) => {
    const processResponse = (response) => {
        console.log(response)
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

import FacebookLogin from 'react-facebook-login'

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
            icon='fa-facebook'
            textButton='Facebook'
            cssClass={className}
        />
    )
}

export default FBLoginButton

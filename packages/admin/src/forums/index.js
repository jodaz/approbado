import DefaultForumLayout from "@approbado/lib/layouts/forums/ForumLayout";
import Admin from "../layouts/Admin";

const ForumLayout = ({ children }) => (
    <Admin>
        <DefaultForumLayout>
            {children}
        </DefaultForumLayout>
    </Admin>
)

export default ForumLayout

import DefaultForumLayout from "@approbado/lib/layouts/forums/ForumLayout";
import DefaultLayout from "../Default";

const ForumLayout = ({ children }) => (
    <DefaultLayout>
        <DefaultForumLayout>
            {children}
        </DefaultForumLayout>
    </DefaultLayout>
)

export default ForumLayout

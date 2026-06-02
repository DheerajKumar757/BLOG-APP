import { Link } from "react-router-dom"
import AnimationWrapper from "../common/page-animation"
import { useContext } from "react"
import { UserContext } from "../App";

const UserNavigationPanel = () => {

    const {userAuth: {username}} = useContext(UserContext);

    return (
        <AnimationWrapper 
        className="absolute right-0 z-50"
        transition={{ duration: 0.2 }}
        >

            <div className=" bg-white relative right-0 border border-gray-300 w-60 overflow-hiddend duration-200">
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4 border border-gray-100">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4 border border-gray-100">
                    Profile
                </Link>

                <Link to="/dashboard/blogs" className="link pl-8 py-4 border border-gray-100">
                    Dashboard
                </Link>

                <Link to="/setings/edit-profile" className="link pl-8 py-4 border border-gray-100">
                    Settings
                </Link>                                             
            </div>

        </AnimationWrapper>
    )

}

export default UserNavigationPanel
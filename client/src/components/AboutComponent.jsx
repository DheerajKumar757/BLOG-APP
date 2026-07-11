import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const AboutUser = ({ className, bio, social_links, joinedAt }) => {

    return (
        <div className={"md:w-[90$] md:mt-7 " + className}>
            <p className="text-xl leading-7">{ bio.length ? bio : "Bio has not been added"}</p>

            <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-gray-800">
                {
                    // <i class="fi fi-brands-youtube"></i>
                    // <i class="fi fi-brands-instagram"></i>
                    // <i class="fi fi-brands-facebook"></i>
                    // <i class="fi fi-brands-twitter"></i>
                    // <i class="fi fi-brands-github"></i>
                    Object.keys(social_links).map((key) => {
                        let link = social_links[key];
                        return (
                            link ? (
                                <Link to={link} key={key} target="_blank" >
                                    <i className={"fi " + (key != 'website' ? "fi-brands-" + key : "fi-rr-globe") + " text-2xl text-gray-700 hover:text-gray-950" }></i>
                                </Link> 
                            )
                            : " " 
                        )
                    })
                }
            </div>

            <p className="text-xl leading-7 text-dark-gray-700">Joined on {getFullDay(joinedAt)}</p>

        </div>
    )
}

export default AboutUser;
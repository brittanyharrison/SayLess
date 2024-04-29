import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { data: users, isLoading, isError: isErrorCreators } = useGetUsers();

  return (
    <div className="common-container">

      <div className="user-container">
      <h2 className="h3-bold md-h2-bold w-full"> All Users</h2>
        <ul className="user-grid">
          {users?.documents.map((user) => (
            <li key={user.$id}>
              <Link to={`/profile/${user.$id}`} className="user-card">
                <img
                  src={user.ImageUrl}
                  alt="user"
                  className="rounded-full w-14 h-14 "
                />
                
                <p>{user.name}</p>
                <p>@{user.username}</p>
      

              <Button type="button" className="shad-button_primary">
                Follow
              </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers;

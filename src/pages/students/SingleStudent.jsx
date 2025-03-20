import { useParams } from "react-router-dom";
function SingleStudent(){
  const {id} = useParams();
  return (
    <div className="">{id}</div>
  )

}
export default SingleStudent;
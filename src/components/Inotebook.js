import Notes from './Notes'

export const Inotebook = (props) => {
  const {showAlert}=props;
  return (
    <div>
       <Notes showAlert={showAlert}/>
       
    </div>
  )
}
export default Inotebook
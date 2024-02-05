import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
import empty from '../images/empty.png'

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote  } = context;

    
    useEffect(() => {
       if(localStorage.getItem('token')){
        getNotes();
        //navigate('/');
       }else{
        navigate('/login');
       }
        // eslint-disable-next-line
    }, [navigate, getNotes]);

    const refEdit = useRef(null)
    const refDelete = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
   
    const updateNote = (currentNote) => {
        refEdit.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
const deleteNote = (noteId) => {
    // Perform synchronous delete operation (replace this with your actual logic)
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    context.deleteNote(noteId);
    refDelete.current.click();
    // Update notes after deletion
    setNote(updatedNotes);
    props.showAlert('Note deleted successfully', 'success');
};   
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert('Updated successfully', "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button ref={refEdit} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <button  ref={refDelete}type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm deletion of note</h5>
        
            </div>
            <div className="modal-body">
              <p>Dear User,</p>
              <p>We have received your request for deletion of note. </p>
              <p>This will remove permenantly your note.</p>
               <p>Are you sure you want to delete this note?"</p>
               <p>Click on the delete button to delete yor records</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
              <button type="button" className="btn btn-danger"  onClick={() =>deleteNote(note.id)}>Delete Note</button>
            </div>
          </div>
        </div>
      </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes && notes.length === 0 && 
                    <div className="d-flex ">
                        <img className="img-fluid ms-5 mt-3" src={empty} alt="empty" style={{ width: "30%", opacity: "0.5" }} />
                    </div>
}
                </div>
                {notes && notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} deleteNote={deleteNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
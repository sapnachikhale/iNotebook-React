import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import noteImg from '../images/inotebook.avif'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="row">

            <table style={{ width: "600px" }}>
            <tbody>
                <tr>
                    <td>
                        <div className="conatainer my-3" >
                            <h2 style={{ fontWeight: "Bold" }}>Create new Note</h2>
                            <p className="mb-4">Add  a new note with your info / notes</p>
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" placeholder="title*" value={note.title} id="title" name="title" aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" placeholder="description*" value={note.description} id="description" name="description" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" placeholder="tags*" className="form-control" value={note.tag} id="tag" name="tag" minLength={5} required onChange={onChange} />
                                </div>
                                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                            </form>
                        </div>
                    </td></tr></tbody>
                    </table>
            <div className="col-md-6 d-flex flex-column align-items-left">
                <img className="img-fluid" style={{ width: "95%" }} src={noteImg} alt="iNotebook" />
            </div>
        </div>

    )
}

export default Addnote
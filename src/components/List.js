import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const List = (props) => {
  const { listOfNotes, setListOfNotes } = props;
  const [updatedNote, setUpdatedNote] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = (item) => {
    const result = window.confirm("Are you sure you want to delete this note?");
    if (result) {
      let newList = listOfNotes.filter((note) => {
        return note.id !== item.id;
      });
      console.log(newList);
      setListOfNotes(newList);
    }
  };

  useEffect(() => {
    console.log(listOfNotes);
  }, [listOfNotes]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState();
  const [note, setNote] = useState();
  const [id, setId] = useState();

  function openModal(e) {
    setIsOpen(true);
    setDate(e.date);
    setNote(e.status);
    setId(e.id);
  }

  const handleNoteUpdate = (e) => {
    const date = new Date();
    const newUpdateUserNote = {
      id: id,
      status: e.target.value,
      date: date.toLocaleString("pt-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    console.log(newUpdateUserNote);
    setUpdatedNote(newUpdateUserNote);
  };

  const updatedTotalNote = () => {
    const index = listOfNotes.findIndex((element) => element.id === id),
      setUpdatedNote = [...listOfNotes];
    setUpdatedNote[index] = updatedNote;
    setListOfNotes(setUpdatedNote);
    setShowAlert(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {listOfNotes.map((item) => {
        return (
          <div key={item.id} className="Note-Wrapper">
            <div className="Date-Note">{item.date}</div>
            <div className="Status-Note">{item.status}</div>
            <div className="Delete-Wrapper">
              <button
                className="Delete-Button"
                onClick={() => handleDelete(item)}
              >
                <FaTrashAlt />
              </button>
            </div>
            <div className="Edit-Wrapper">
              <button
                className="Edit-Button"
                value={item.id}
                onClick={() => openModal(item)}
              >
                <FaEdit />
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="Note-Modal-Wrapper">
                  <div className="Date-Note">{date}</div>
                  <TextareaAutosize
                    className="Status-Edit-Note"
                    onChange={handleNoteUpdate}
                  >
                    {note}
                  </TextareaAutosize>
                  <button
                    className="Update-Button"
                    onClick={() => updatedTotalNote(item)}
                  >
                    <FaCheckCircle />
                    {showAlert && <div className="saved">Saved!</div>}
                  </button>
                  <button className="Close-Button" onClick={closeModal}>
                    <FaWindowClose />
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;

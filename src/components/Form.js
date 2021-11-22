import { useEffect, useRef } from "react";
import uniqid from "uniqid";
import TextareaAutosize from "react-textarea-autosize";

const Form = (props) => {
  const { setListOfNotes, noteInput, setNoteInput } = props;
  const inputValueRef = useRef();

  const handleChangeNote = (e) => {
    const date = new Date();
    const newUserInput = {
      id: uniqid(),
      status: e.target.value,
      date: date.toLocaleString("pt-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    setNoteInput(newUserInput);
  };

  const handleSubmit = () => {
    setListOfNotes((prevState) => {
      return [noteInput, ...prevState];
    });

    inputValueRef.current.value = null;
  };

  useEffect(() => {
    if (noteInput) console.log(noteInput);
  }, [noteInput]);

  return (
    <div className="Form-wrapper">
      <TextareaAutosize
        ref={inputValueRef}
        className="Notes"
        type="text"
        placeholder="Your note..."
        onChange={handleChangeNote}
      />

      <button className="Submit-Button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};
export default Form;

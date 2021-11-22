import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import Title from "./components/Title";
import { useEffect, useState } from "react";

function App() {
  const [noteInput, setNoteInput] = useState();
  const [listOfNotes, setListOfNotes] = useState([]);

  useEffect(() => {
    console.log(listOfNotes);
  }, [listOfNotes]);
  return (
    <>
      <div className="App">
        <Title />
        <Form
          setListOfNotes={setListOfNotes}
          noteInput={noteInput}
          setNoteInput={setNoteInput}
        />
      </div>
      <List listOfNotes={listOfNotes} setListOfNotes={setListOfNotes} />
    </>
  );
}

export default App;

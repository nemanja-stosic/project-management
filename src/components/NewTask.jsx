import { useRef, useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredTaskName, setEnteredTaskName] = useState("");

  const dialog = useRef();

  function handleChange(event) {
    setEnteredTaskName(event.target.value);
  }

  function handleClick() {
    if (enteredTaskName.trim() === "") {
      dialog.current.open();
      return;
    }
    onAdd(enteredTaskName);
    setEnteredTaskName("");
  }

  return (
    <>
      <Modal ref={dialog} buttonName="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4 ">
          Error: Invalid input
        </h2>
        <p className="text-stone-600 my-4">Please enter task name!</p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTaskName}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
}

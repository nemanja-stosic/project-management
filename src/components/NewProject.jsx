import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onSave, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const dialog = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //validation...
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      dialog.current.open();
      return;
    }
    
    onSave({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={dialog} buttonName="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4 ">
          Error: Invalid input
        </h2>
        <p className="text-stone-600 my-4">Please enter all data required!</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="bg-stone-800 text-stone-50 px-6 py-2 rounded-md hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input label="Title" ref={title} type="text" />
          {/* textarea will be by default true */}
          <Input label="Description" textarea ref={description} />
          <Input label="Due DATE" ref={dueDate} type="date" />
        </div>
      </div>
    </>
  );
}

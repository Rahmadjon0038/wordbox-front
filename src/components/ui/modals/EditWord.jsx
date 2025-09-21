'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function EditWord({ word, children }) {
  const [open, setOpen] = useState(false);
  const [newWord, setNewWord] = useState({
    english: "",
    uzbek: "",
    example: "",
    exampleUz: "",
  });

  const handleOpen = () => setOpen(true);

  // Modal ochilganda inputlarni word bilan to'ldirish
  useEffect(() => {
    if (open && word) {
      setNewWord({
        english: word.english || "",
        uzbek: word.uzbek || "",
        example: word.example || "",
        exampleUz: word.exampleUz || "",
      });
    }
  }, [open, word]);
  const handleClose = () => {
    setNewWord({ english: "", uzbek: "", example: "", exampleUz: "" });
    setOpen(false);
  };

  const addWord = (e) => {
    e.preventDefault();
    console.log(newWord); // <-- Hozircha faqat console.log
    console.log(word)

    handleClose();
  };

  return (
    <div>
      <button
        onClick={handleOpen} >
        {children}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-word-modal-title"
      >
        <Box sx={style}>
          <Typography id="add-word-modal-title" variant="h6" component="h2" gutterBottom>
            Edit word
          </Typography>

          {/* Form */}
          <form onSubmit={addWord} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="English word"
              value={newWord.english}
              onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              placeholder="Uzbek translation"
              value={newWord.uzbek}
              onChange={(e) => setNewWord({ ...newWord, uzbek: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              placeholder="Example sentence (EN)"
              value={newWord.example}
              onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 col-span-2"
            />
            <input
              type="text"
              placeholder="Example translation (UZ)"
              value={newWord.exampleUz}
              onChange={(e) => setNewWord({ ...newWord, exampleUz: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 col-span-2"
            />

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Word
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

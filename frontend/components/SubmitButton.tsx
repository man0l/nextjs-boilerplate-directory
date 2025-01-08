'use client';

import { useState } from 'react';
import SubmitToolModal from './SubmitToolModal';

export default function SubmitButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="button-primary"
      >
        Submit Boilerplate
      </button>

      <SubmitToolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 
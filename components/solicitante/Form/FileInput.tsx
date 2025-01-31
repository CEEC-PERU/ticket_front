import React, { useState } from 'react';

interface FileInputProps {
  onChange: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        onChange(updatedFiles); // Update parent component with the new list of files
        return updatedFiles;
      });
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles); // Update parent component with the updated list of files
  };

  return (
    <div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className=' text-fuchsia-800 pt-5'>{file.name}</span>
            <button
              type="button"
              className="text-red-600 "
              onClick={() => handleFileRemove(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="file"
          multiple
          name='materials'
          className="p-3 border rounded-lg text-black pt-5"
          onChange={handleFileChange}
        />
           <span className="text-gray-500 ">Tipo de documento adminitido .jpg .png .pdf </span>
      </div>
   
    </div>
  );
};

export default FileInput;
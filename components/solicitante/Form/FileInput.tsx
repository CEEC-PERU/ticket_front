import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './../../../utils/cropImage'; // Función para procesar la imagen recortada

interface FileInputProps {
  onChange: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      newFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => setCropImage(reader.result as string);
        } else {
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, file];
            onChange(updatedFiles);
            return updatedFiles;
          });
        }
      });
    }
  };

  const handleCropComplete = async (_: any, croppedAreaPixels: any) => {
    if (cropImage) {
      const croppedBlob = await getCroppedImg(cropImage, croppedAreaPixels);
      if (croppedBlob) {
        const newFile = new File([croppedBlob], `edited-${Date.now()}.jpg`, { type: "image/jpeg" });
        setCroppedFile(newFile);
      }
    }
  };

  const handleSaveCroppedImage = () => {
    if (croppedFile) {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, croppedFile];
        onChange(updatedFiles);
        return updatedFiles;
      });
      setCropImage(null);
      setCroppedFile(null);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      onChange(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div>
      {/* Lista de archivos */}
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between">
            {file.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded-md" />
            ) : (
              <span className="text-fuchsia-800">{file.name}</span>
            )}
            <button type="button" className="text-red-600" onClick={() => handleFileRemove(index)}>X</button>
          </div>
        ))}
      </div>

      {/* Entrada de archivos */}
      <div className="flex items-center space-x-2 mt-2">
        <input type="file" multiple accept=".jpg,.png,.pdf" className="p-3 border rounded-lg text-black" onChange={handleFileChange} />
        <span className="text-gray-500">Archivos permitidos: .jpg, .png, .pdf</span>
      </div>

      {/* Editor de imagen */}
      {cropImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
          <div className="relative w-96 h-96">
            <Cropper image={cropImage} crop={crop} zoom={zoom} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={handleCropComplete} />
          </div>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleSaveCroppedImage}>Guardar Imagen</button>
          <button className="mt-2 text-red-500" onClick={() => setCropImage(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default FileInput;

// import { useRef, useState } from "react";

// import {
//   FaCloudUploadAlt,
//   FaFilePdf,
//   FaFileImage,
//   FaCheckCircle,
//   FaRobot,
// } from "react-icons/fa";

// import toast from "react-hot-toast";

// import {
//   uploadDocument,
//   generateDocumentSummary,
// } from "../services/api";

// import { useAuth } from "../context/AuthContext";
// import LoginModal from "./LoginModal";


// const MAX_FILE_SIZE = 10 * 1024 * 1024;

// const ALLOWED_TYPES = [
//   "application/pdf",
//   "image/png",
//   "image/jpeg",
// ];


// function UploadSection({ onUploadSuccess }) {
//   const { user } = useAuth();

//   const fileInputRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [dragging, setDragging] = useState(false);

//   const [uploading, setUploading] =
//     useState(false);

//   const [generatingSummary, setGeneratingSummary] =
//     useState(false);

//   const [documentId, setDocumentId] =
//     useState("");

//   const [uploaded, setUploaded] =
//     useState(false);

//   const [showLogin, setShowLogin] =
//     useState(false);


//   const validateFile = (selectedFile) => {
//     if (!selectedFile) {
//       return false;
//     }

//     if (
//       !ALLOWED_TYPES.includes(
//         selectedFile.type
//       )
//     ) {
//       toast.error(
//         "Only PDF, PNG and JPG/JPEG files are allowed."
//       );

//       return false;
//     }

//     if (
//       selectedFile.size >
//       MAX_FILE_SIZE
//     ) {
//       toast.error(
//         "File size must be less than 10 MB."
//       );

//       return false;
//     }

//     return true;
//   };


//   const handleFile = (selectedFile) => {
//     if (!validateFile(selectedFile)) {
//       return;
//     }

//     setFile(selectedFile);
//     setUploaded(false);
//     setDocumentId("");
//   };


//   const handleFileInput = (e) => {
//     const selectedFile =
//       e.target.files?.[0];

//     handleFile(selectedFile);
//   };


//   const handleDrop = (e) => {
//     e.preventDefault();

//     setDragging(false);

//     const droppedFile =
//       e.dataTransfer.files?.[0];

//     handleFile(droppedFile);
//   };


//   const handleUpload = async () => {
//     if (!user) {
//       setShowLogin(true);
//       return;
//     }

//     if (!file) {
//       toast.error(
//         "Please select a document first."
//       );
//       return;
//     }

//     try {
//       setUploading(true);

//       const formData = new FormData();

//       formData.append(
//         "file",
//         file
//       );

//       const res =
//         await uploadDocument(
//           formData
//         );

//       const data = res.data;

//       setDocumentId(
//         data.document_id
//       );

//       setUploaded(true);

//       onUploadSuccess?.({
//         ...data,
//         summary: "",
//       });

//       toast.success(
//         "Document uploaded successfully."
//       );

//     } catch (err) {
//       console.error(
//         "Upload error:",
//         err
//       );

//       const message =
//         err.response?.data?.detail ||
//         "Document upload failed.";

//       toast.error(message);

//     } finally {
//       setUploading(false);
//     }
//   };


//   const handleGenerateSummary =
//     async () => {
//       if (!documentId) {
//         return;
//       }

//       try {
//         setGeneratingSummary(true);

//         const res =
//           await generateDocumentSummary(
//             documentId
//           );

//         const data = res.data;

//         onUploadSuccess?.({
//           document_id:
//             data.document_id,
//           filename:
//             data.filename,
//           summary:
//             data.summary,
//         });

//         toast.success(
//           "AI summary generated successfully."
//         );

//       } catch (err) {
//         console.error(
//           "Summary error:",
//           err
//         );

//         const message =
//           err.response?.data?.detail ||
//           "Unable to generate summary.";

//         toast.error(message);

//       } finally {
//         setGeneratingSummary(false);
//       }
//     };


//   const chooseFile = () => {
//     if (!user) {
//       setShowLogin(true);
//       return;
//     }

//     fileInputRef.current?.click();
//   };


//   const isPdf =
//     file?.type ===
//     "application/pdf";


//   return (
//     <>
//       <div className="bg-white rounded-2xl shadow-sm border p-6 min-h-[560px] flex flex-col">

//         <div className="flex items-center gap-3 mb-5">

//           <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

//             <FaCloudUploadAlt
//               className="text-blue-600"
//               size={23}
//             />

//           </div>

//           <div>

//             <h2 className="text-2xl font-bold text-gray-800">
//               Upload Legal Document
//             </h2>

//             <p className="text-sm text-gray-500">
//               Upload a PDF or image for AI analysis.
//             </p>

//           </div>

//         </div>


//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".pdf,.png,.jpg,.jpeg"
//           onChange={handleFileInput}
//           className="hidden"
//         />


//         {!file && (

//           <div
//             onDragOver={(e) => {
//               e.preventDefault();
//               setDragging(true);
//             }}
//             onDragLeave={() =>
//               setDragging(false)
//             }
//             onDrop={handleDrop}
//             onClick={chooseFile}
//             className={
//               dragging
//                 ? "cursor-pointer rounded-xl border-2 border-dashed border-blue-500 bg-blue-50 p-10 text-center transition flex-1 flex flex-col justify-center"
//                 : "cursor-pointer rounded-xl border-2 border-dashed border-blue-300 p-10 text-center transition flex-1 flex flex-col justify-center hover:bg-blue-50"
//             }
//           >

//             <FaCloudUploadAlt
//               className="mx-auto text-blue-500"
//               size={55}
//             />

//             <h3 className="text-xl font-semibold text-gray-700 mt-5">
//               Drag & Drop your document
//             </h3>

//             <p className="text-gray-500 mt-2">
//               or click to browse files
//             </p>

//             <p className="text-xs text-gray-400 mt-4">
//               PDF, PNG, JPG/JPEG • Maximum 10 MB
//             </p>

//           </div>

//         )}


//         {file && !uploaded && (

//           <div className="flex-1 flex flex-col justify-center">

//             <div className="border rounded-xl p-6 bg-slate-50">

//               <div className="flex items-center gap-4">

//                 <div className="w-14 h-14 rounded-xl bg-white border flex items-center justify-center">

//                   {isPdf ? (

//                     <FaFilePdf
//                       className="text-red-600"
//                       size={30}
//                     />

//                   ) : (

//                     <FaFileImage
//                       className="text-blue-600"
//                       size={30}
//                     />

//                   )}

//                 </div>


//                 <div className="min-w-0">

//                   <p className="font-semibold text-gray-800 truncate">
//                     {file.name}
//                   </p>

//                   <p className="text-sm text-gray-500 mt-1">
//                     {(file.size / 1024 / 1024).toFixed(2)} MB
//                   </p>

//                 </div>

//               </div>


//               <button
//                 onClick={handleUpload}
//                 disabled={uploading}
//                 className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
//               >

//                 {uploading
//                   ? "Processing document..."
//                   : "Upload & Process"}

//               </button>

//             </div>

//           </div>

//         )}


//         {uploaded && (

//           <div className="flex-1 flex flex-col justify-center">

//             <div className="border rounded-xl p-6 bg-green-50 border-green-200">

//               <div className="flex items-center gap-3">

//                 <FaCheckCircle
//                   className="text-green-600"
//                   size={28}
//                 />

//                 <div>

//                   <h3 className="font-bold text-green-800">
//                     Document Ready
//                   </h3>

//                   <p className="text-sm text-green-700 mt-1">
//                     {file?.name}
//                   </p>

//                 </div>

//               </div>


//               <div className="mt-5 bg-white rounded-lg border p-4">

//                 <div className="flex items-center gap-3">

//                   <FaRobot
//                     className="text-blue-600"
//                     size={22}
//                   />

//                   <p className="text-sm text-gray-600">
//                     Your document has been processed
//                     and its content is ready for AI analysis.
//                   </p>

//                 </div>

//               </div>


//               <button
//                 onClick={handleGenerateSummary}
//                 disabled={
//                   generatingSummary
//                 }
//                 className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
//               >

//                 {generatingSummary
//                   ? "Generating AI Summary..."
//                   : "Generate AI Summary"}

//               </button>

//             </div>

//           </div>

//         )}


//         <p className="text-xs text-gray-400 text-center mt-5">
//           Your document is processed securely for AI-powered analysis.
//         </p>

//       </div>


//       <LoginModal
//         open={showLogin}
//         onClose={() =>
//           setShowLogin(false)
//         }
//       />

//     </>
//   );
// }


// export default UploadSection;

import { useRef, useState } from "react";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileImage,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  uploadDocument,
  generateDocumentSummary,
} from "../services/api";

import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
];

function UploadSection({ onUploadSuccess }) {
  const { user } = useAuth();

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [generatingSummary, setGeneratingSummary] =
    useState(false);

  const [documentId, setDocumentId] =
    useState("");

  const [uploaded, setUploaded] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);


  // ==========================================
  // VALIDATE FILE
  // ==========================================

  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      return false;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error(
        "Only PDF, PNG and JPG/JPEG files are allowed."
      );

      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(
        "File size must be less than or equal to 10 MB."
      );

      return false;
    }

    return true;
  };


  // ==========================================
  // HANDLE SELECTED FILE
  // ==========================================

  const handleFile = (selectedFile) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setUploaded(false);
    setDocumentId("");
  };


  // ==========================================
  // FILE INPUT
  // ==========================================

  const handleFileInput = (e) => {
    const selectedFile =
      e.target.files?.[0];

    handleFile(selectedFile);

    // Allows selecting the same file again
    e.target.value = "";
  };


  // ==========================================
  // DRAG & DROP
  // ==========================================

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const droppedFile =
      e.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };


  // ==========================================
  // UPLOAD DOCUMENT
  // ==========================================

  const handleUpload = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!file) {
      toast.error(
        "Please select a document first."
      );

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      const res =
        await uploadDocument(formData);

      const data = res?.data;

      if (!data?.document_id) {
        throw new Error(
          "Document ID was not returned by the server."
        );
      }

      setDocumentId(
        data.document_id
      );

      setUploaded(true);

      onUploadSuccess?.({
        ...data,
        summary: "",
      });

      toast.success(
        "Document uploaded successfully."
      );

    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Document upload failed.";

      toast.error(message);

    } finally {
      setUploading(false);
    }
  };


  // ==========================================
  // GENERATE SUMMARY
  // ==========================================

  const handleGenerateSummary =
    async () => {

      if (!documentId) {
        toast.error(
          "Document ID is missing."
        );

        return;
      }

      try {
        setGeneratingSummary(true);

        const res =
          await generateDocumentSummary(
            documentId
          );

        const data = res?.data;

        if (!data?.summary) {
          throw new Error(
            "Summary was not returned by the server."
          );
        }

        onUploadSuccess?.({
          document_id:
            data.document_id || documentId,

          filename:
            data.filename || file?.name || "",

          summary:
            data.summary,
        });

        toast.success(
          "AI summary generated successfully."
        );

      } catch (err) {
        console.error(
          "Summary error:",
          err
        );

        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Unable to generate summary.";

        toast.error(message);

      } finally {
        setGeneratingSummary(false);
      }
    };


  // ==========================================
  // CHOOSE FILE
  // ==========================================

  const chooseFile = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    fileInputRef.current?.click();
  };


  // ==========================================
  // FILE TYPE
  // ==========================================

  const isPdf =
    file?.type ===
    "application/pdf";


  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border p-6 min-h-[560px] flex flex-col">

        {/* Header */}

        <div className="flex items-center gap-3 mb-5">

          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

            <FaCloudUploadAlt
              className="text-blue-600"
              size={23}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Upload Legal Document
            </h2>

            <p className="text-sm text-gray-500">
              Upload a PDF or image for AI analysis.
            </p>

          </div>

        </div>


        {/* Hidden Input */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileInput}
          className="hidden"
        />


        {/* =====================================
            NO FILE
        ====================================== */}

        {!file && (

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}

            onDragLeave={() =>
              setDragging(false)
            }

            onDrop={handleDrop}

            onClick={chooseFile}

            className={
              dragging
                ? "cursor-pointer rounded-xl border-2 border-dashed border-blue-500 bg-blue-50 p-10 text-center transition flex-1 flex flex-col justify-center"
                : "cursor-pointer rounded-xl border-2 border-dashed border-blue-300 p-10 text-center transition flex-1 flex flex-col justify-center hover:bg-blue-50"
            }
          >

            <FaCloudUploadAlt
              className="mx-auto text-blue-500"
              size={55}
            />

            <h3 className="text-xl font-semibold text-gray-700 mt-5">
              Drag & Drop your document
            </h3>

            <p className="text-gray-500 mt-2">
              or click to browse files
            </p>

            <p className="text-xs text-gray-400 mt-4">
              PDF, PNG, JPG/JPEG • Maximum 10 MB
            </p>

          </div>

        )}


        {/* =====================================
            FILE SELECTED
        ====================================== */}

        {file && !uploaded && (

          <div className="flex-1 flex flex-col justify-center">

            <div className="border rounded-xl p-6 bg-slate-50">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-white border flex items-center justify-center">

                  {isPdf ? (

                    <FaFilePdf
                      className="text-red-600"
                      size={30}
                    />

                  ) : (

                    <FaFileImage
                      className="text-blue-600"
                      size={30}
                    />

                  )}

                </div>


                <div className="min-w-0">

                  <p className="font-semibold text-gray-800 truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>


              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
              >
                {uploading
                  ? "Processing document..."
                  : "Upload & Process"}
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            UPLOADED
        ====================================== */}

        {uploaded && (

          <div className="flex-1 flex flex-col justify-center">

            <div className="border rounded-xl p-6 bg-green-50 border-green-200">

              <div className="flex items-center gap-3">

                <FaCheckCircle
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <h3 className="font-bold text-green-800">
                    Document Ready
                  </h3>

                  <p className="text-sm text-green-700 mt-1">
                    {file?.name}
                  </p>

                </div>

              </div>


              <div className="mt-5 bg-white rounded-lg border p-4">

                <div className="flex items-center gap-3">

                  <FaRobot
                    className="text-blue-600"
                    size={22}
                  />

                  <p className="text-sm text-gray-600">
                    Your document has been processed
                    and its content is ready for AI analysis.
                  </p>

                </div>

              </div>


              <button
                onClick={handleGenerateSummary}
                disabled={generatingSummary}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
              >
                {generatingSummary
                  ? "Generating AI Summary..."
                  : "Generate AI Summary"}
              </button>

            </div>

          </div>

        )}


        {/* Security */}

        <p className="text-xs text-gray-400 text-center mt-5">
          Your document is processed securely for AI-powered analysis.
        </p>

      </div>


      {/* Login Modal */}

      <LoginModal
        open={showLogin}
        onClose={() =>
          setShowLogin(false)
        }
      />

    </>
  );
}

export default UploadSection;
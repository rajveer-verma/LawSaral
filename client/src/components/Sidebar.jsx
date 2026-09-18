// // import { useEffect, useState } from "react";
// // import {
// //   getUploadHistory,
// //   deleteDocument,
// // } from "../services/api";

// // import { useAuth } from "../context/AuthContext";

// // import {
// //   FaFilePdf,
// //   FaFileImage,
// //   FaTrash,
// //   FaBars,
// //   FaTimes,
// // } from "react-icons/fa";

// // import toast from "react-hot-toast";


// // function Sidebar({
// //   onSelectDocument,
// //   sidebarOpen,
// //   setSidebarOpen,
// //   refreshKey,
// // }) {
// //   const { user } = useAuth();

// //   const [documents, setDocuments] =
// //     useState([]);

// //   const [loading, setLoading] =
// //     useState(true);


// //   const loadDocuments = async () => {
// //     if (!user) {
// //       setDocuments([]);
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const res =
// //         await getUploadHistory();

// //       setDocuments(
// //         res.data?.documents || []
// //       );

// //     } catch (err) {
// //       console.error(
// //         "History Error:",
// //         err
// //       );

// //       toast.error(
// //         "Unable to load document history."
// //       );

// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   useEffect(() => {
// //     loadDocuments();
// //   }, [user, refreshKey]);


// //   const handleDelete = async (documentId) => {
// //     const ok = window.confirm(
// //       "Delete this document?"
// //     );

// //     if (!ok) return;

// //     try {
// //       await deleteDocument(
// //         documentId
// //       );

// //       setDocuments((prev) =>
// //         prev.filter(
// //           (doc) =>
// //             doc.document_id !==
// //             documentId
// //         )
// //       );

// //       toast.success(
// //         "Document deleted successfully."
// //       );

// //     } catch (err) {
// //       console.error(
// //         "Delete Error:",
// //         err
// //       );

// //       const message =
// //         err.response?.data?.detail ||
// //         "Delete failed";

// //       toast.error(message);
// //     }
// //   };


// //   if (!sidebarOpen) {
// //     return (
// //       <button
// //         onClick={() =>
// //           setSidebarOpen(true)
// //         }
// //         className="fixed left-4 top-24 z-50 bg-white shadow-lg border rounded-lg p-3 hover:bg-gray-100 transition"
// //       >
// //         <FaBars size={20} />
// //       </button>
// //     );
// //   }


// //   return (
// //     <aside className="w-72 bg-white border-r min-h-screen sticky top-0 transition-all duration-300">

// //       <div className="p-5 border-b flex justify-between items-center">

// //         <div className="flex items-center gap-3">
// //           <FaBars />

// //           <h2 className="font-bold text-xl">
// //             History
// //           </h2>
// //         </div>

// //         <button
// //           onClick={() =>
// //             setSidebarOpen(false)
// //           }
// //           className="text-gray-500 hover:text-red-600"
// //         >
// //           <FaTimes />
// //         </button>

// //       </div>


// //       <div className="p-4">

// //         <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
// //           Uploaded Documents
// //         </h3>


// //         {loading && (
// //           <p className="text-sm text-gray-500">
// //             Loading...
// //           </p>
// //         )}


// //         {!loading &&
// //           documents.length === 0 && (
// //             <p className="text-sm text-gray-500">
// //               No documents yet
// //             </p>
// //           )}


// //         <div className="space-y-2">

// //           {documents.map((doc) => {

// //             const isPdf =
// //               doc.file_type === "pdf";

// //             return (
// //               <div
// //                 key={doc.document_id}
// //                 className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
// //               >

// //                 <button
// //                   onClick={() =>
// //                     onSelectDocument(doc)
// //                   }
// //                   className="flex items-center gap-2 flex-1 text-left min-w-0"
// //                 >

// //                   {isPdf ? (
// //                     <FaFilePdf className="text-red-600 shrink-0" />
// //                   ) : (
// //                     <FaFileImage className="text-blue-600 shrink-0" />
// //                   )}

// //                   <span className="truncate text-sm">
// //                     {doc.filename}
// //                   </span>

// //                 </button>


// //                 <button
// //                   onClick={() =>
// //                     handleDelete(
// //                       doc.document_id
// //                     )
// //                   }
// //                   className="text-red-500 hover:text-red-700 ml-2"
// //                 >
// //                   <FaTrash />
// //                 </button>

// //               </div>
// //             );
// //           })}

// //         </div>

// //       </div>

// //     </aside>
// //   );
// // }


// // export default Sidebar;



// import { useEffect, useState } from "react";
// import {
//   FaBars,
//   FaTimes,
//   FaFilePdf,
//   FaFileImage,
//   FaTrash,
//   FaHistory,
//   FaChevronRight,
// } from "react-icons/fa";
// import toast from "react-hot-toast";

// import { useAuth } from "../context/AuthContext";
// import { getUploadHistory, deleteDocument } from "../services/api";

// function Sidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   onSelectDocument,
//   refreshKey,
// }) {
//   const { user } = useAuth();

//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // =========================
//   // LOAD DOCUMENT HISTORY
//   // =========================
//   const loadHistory = async () => {
//     if (!user) {
//       setDocuments([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await getUploadHistory();

//       console.log("Upload History Response:", response?.data);

//       /*
//         API response can be:
//         1. response.data = [...]
//         2. response.data.documents = [...]
//         3. response.data.history = [...]
//       */

//       let history = [];

//       if (Array.isArray(response?.data)) {
//         history = response.data;
//       } else if (Array.isArray(response?.data?.documents)) {
//         history = response.data.documents;
//       } else if (Array.isArray(response?.data?.history)) {
//         history = response.data.history;
//       }

//       setDocuments(history);
//     } catch (error) {
//       console.error("History Error:", error);

//       setDocuments([]);

//       toast.error("Unable to load document history.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // LOAD HISTORY ON START
//   // =========================
//   useEffect(() => {
//     loadHistory();
//   }, [user, refreshKey]);

//   // =========================
//   // DELETE DOCUMENT
//   // =========================
//   const handleDelete = async (event, documentId) => {
//     event.stopPropagation();

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this document?"
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await deleteDocument(documentId);

//       setDocuments((previousDocuments) =>
//         previousDocuments.filter(
//           (document) => document.document_id !== documentId
//         )
//       );

//       toast.success("Document deleted successfully.");
//     } catch (error) {
//       console.error("Delete Document Error:", error);

//       toast.error(
//         error?.response?.data?.detail ||
//           "Unable to delete document."
//       );
//     }
//   };

//   // =========================
//   // FILE ICON
//   // =========================
//   const getFileIcon = (filename = "") => {
//     const extension = filename
//       .split(".")
//       .pop()
//       ?.toLowerCase();

//     if (extension === "pdf") {
//       return (
//         <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
//           <FaFilePdf className="text-red-500 text-lg" />
//         </div>
//       );
//     }

//     return (
//       <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
//         <FaFileImage className="text-blue-500 text-lg" />
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* =====================================
//           OPEN SIDEBAR BUTTON
//       ====================================== */}
//       {!sidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="
//             fixed
//             left-4
//             top-[88px]
//             z-40
//             w-10
//             h-10
//             bg-white
//             border
//             border-gray-200
//             rounded-lg
//             shadow-sm
//             flex
//             items-center
//             justify-center
//             text-gray-600
//             hover:text-blue-600
//             hover:border-blue-200
//             transition
//           "
//           title="Open History"
//         >
//           <FaBars />
//         </button>
//       )}

//       {/* =====================================
//           SIDEBAR
//       ====================================== */}
//       <aside
//         className={`
//           ${
//             sidebarOpen
//               ? "w-[290px] min-w-[290px]"
//               : "w-0 min-w-0 overflow-hidden"
//           }

//           bg-white
//           border-r
//           border-gray-200
//           transition-all
//           duration-300
//           sticky
//           top-[72px]
//           h-[calc(100vh-72px)]
//           z-30
//         `}
//       >
//         {/* Fixed width content so animation works properly */}
//         <div className="w-[290px] h-full flex flex-col">

//           {/* =================================
//               SIDEBAR HEADER
//           ================================== */}
//           <div
//             className="
//               h-[72px]
//               px-5
//               border-b
//               border-gray-100
//               flex
//               items-center
//               justify-between
//               shrink-0
//             "
//           >
//             <div className="flex items-center gap-3">

//               <div
//                 className="
//                   w-9
//                   h-9
//                   rounded-lg
//                   bg-blue-50
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 <FaHistory className="text-blue-600 text-sm" />
//               </div>

//               <div>
//                 <h2 className="font-bold text-gray-800 text-base">
//                   History
//                 </h2>

//                 <p className="text-xs text-gray-400">
//                   Your documents
//                 </p>
//               </div>
//             </div>

//             {/* Close button */}
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="
//                 w-8
//                 h-8
//                 rounded-lg
//                 flex
//                 items-center
//                 justify-center
//                 text-gray-400
//                 hover:bg-gray-100
//                 hover:text-gray-700
//                 transition
//               "
//               title="Close History"
//             >
//               <FaTimes size={14} />
//             </button>
//           </div>

//           {/* =================================
//               DOCUMENT LIST
//           ================================== */}
//           <div className="flex-1 overflow-y-auto px-3 py-4">

//             {/* Section title */}
//             <div className="px-2 mb-3">
//               <p
//                 className="
//                   text-xs
//                   font-semibold
//                   uppercase
//                   tracking-wider
//                   text-gray-400
//                 "
//               >
//                 Uploaded Documents
//               </p>
//             </div>

//             {/* =================================
//                 LOADING STATE
//             ================================== */}
//             {loading && (
//               <div className="space-y-3 px-2">

//                 <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

//                 <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

//                 <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

//               </div>
//             )}

//             {/* =================================
//                 EMPTY STATE
//             ================================== */}
//             {!loading && documents.length === 0 && (
//               <div className="px-5 py-10 text-center">

//                 <div
//                   className="
//                     w-12
//                     h-12
//                     mx-auto
//                     rounded-full
//                     bg-gray-50
//                     flex
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <FaHistory className="text-gray-300" />
//                 </div>

//                 <p className="mt-4 text-sm font-medium text-gray-500">
//                   No documents yet
//                 </p>

//                 <p className="mt-1 text-xs text-gray-400 leading-5">
//                   Upload a legal document to see it here.
//                 </p>

//               </div>
//             )}

//             {/* =================================
//                 DOCUMENTS
//             ================================== */}
//             {!loading &&
//               Array.isArray(documents) &&
//               documents.map((doc) => (
//                 <div
//                   key={doc.document_id}
//                   onClick={() => onSelectDocument(doc)}
//                   className="
//                     group
//                     mb-2
//                     p-3
//                     rounded-xl
//                     border
//                     border-transparent
//                     hover:border-blue-100
//                     hover:bg-blue-50/60
//                     cursor-pointer
//                     transition
//                   "
//                 >
//                   <div className="flex items-center gap-3">

//                     {/* File icon */}
//                     {getFileIcon(doc?.filename || "")}

//                     {/* Document information */}
//                     <div className="flex-1 min-w-0">

//                       <p
//                         className="
//                           text-sm
//                           font-medium
//                           text-gray-700
//                           truncate
//                           group-hover:text-blue-700
//                         "
//                         title={doc?.filename || ""}
//                       >
//                         {doc?.filename || "Untitled Document"}
//                       </p>

//                       {doc?.created_at && (
//                         <p className="text-xs text-gray-400 mt-1">
//                           {new Date(
//                             doc.created_at
//                           ).toLocaleDateString()}
//                         </p>
//                       )}

//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-1">

//                       {/* Delete */}
//                       <button
//                         onClick={(event) =>
//                           handleDelete(
//                             event,
//                             doc.document_id
//                           )
//                         }
//                         className="
//                           w-8
//                           h-8
//                           rounded-lg
//                           flex
//                           items-center
//                           justify-center
//                           text-gray-300
//                           hover:text-red-500
//                           hover:bg-red-50
//                           transition
//                           opacity-0
//                           group-hover:opacity-100
//                         "
//                         title="Delete document"
//                       >
//                         <FaTrash size={12} />
//                       </button>

//                       {/* Arrow */}
//                       <FaChevronRight
//                         className="
//                           text-gray-300
//                           group-hover:text-blue-400
//                           transition
//                         "
//                         size={11}
//                       />

//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* =================================
//               FOOTER
//           ================================== */}
//           <div
//             className="
//               px-4
//               py-4
//               border-t
//               border-gray-100
//               shrink-0
//             "
//           >
//             <p className="text-[11px] text-gray-400 text-center leading-4">
//               Your uploaded documents are securely stored.
//             </p>
//           </div>

//         </div>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;


import { useEffect, useState } from "react";

import {
  FaBars,
  FaTimes,
  FaFilePdf,
  FaFileImage,
  FaTrash,
  FaHistory,
  FaChevronRight,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import {
  getUploadHistory,
  deleteDocument,
} from "../services/api";


function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onSelectDocument,
  onDeleteDocument,
  refreshKey,
}) {
  const { user } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // LOAD DOCUMENT HISTORY
  // =========================

  const loadHistory = async () => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response =
        await getUploadHistory();

      console.log(
        "Upload History Response:",
        response?.data
      );

      /*
        API response can be:
        1. response.data = [...]
        2. response.data.documents = [...]
        3. response.data.history = [...]
      */

      let history = [];

      if (Array.isArray(response?.data)) {
        history = response.data;

      } else if (
        Array.isArray(
          response?.data?.documents
        )
      ) {
        history =
          response.data.documents;

      } else if (
        Array.isArray(
          response?.data?.history
        )
      ) {
        history =
          response.data.history;
      }

      setDocuments(history);

    } catch (error) {
      console.error(
        "History Error:",
        error
      );

      setDocuments([]);

      toast.error(
        "Unable to load document history."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // LOAD HISTORY ON START
  // =========================

  useEffect(() => {
    loadHistory();
  }, [user, refreshKey]);


  // =========================
  // DELETE DOCUMENT
  // =========================

  const handleDelete = async (
    event,
    documentId
  ) => {
    event.stopPropagation();

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this document?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(
        documentId
      );

      setDocuments(
        (previousDocuments) =>
          previousDocuments.filter(
            (document) =>
              document.document_id !==
              documentId
          )
      );

      // Notify Home.jsx that a document was deleted
      onDeleteDocument?.(documentId);

      toast.success(
        "Document deleted successfully."
      );

    } catch (error) {
      console.error(
        "Delete Document Error:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to delete document."
      );
    }
  };


  // =========================
  // FILE ICON
  // =========================

  const getFileIcon = (
    filename = ""
  ) => {
    const extension =
      filename
        .split(".")
        .pop()
        ?.toLowerCase();

    if (extension === "pdf") {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <FaFilePdf className="text-red-500 text-lg" />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <FaFileImage className="text-blue-500 text-lg" />
      </div>
    );
  };


  return (
    <>
      {/* =====================================
          OPEN SIDEBAR BUTTON
      ====================================== */}

      {!sidebarOpen && (
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
            fixed
            left-4
            top-[88px]
            z-40
            w-10
            h-10
            bg-white
            border
            border-gray-200
            rounded-lg
            shadow-sm
            flex
            items-center
            justify-center
            text-gray-600
            hover:text-blue-600
            hover:border-blue-200
            transition
          "
          title="Open History"
        >
          <FaBars />
        </button>
      )}


      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          ${
            sidebarOpen
              ? "w-[290px] min-w-[290px]"
              : "w-0 min-w-0 overflow-hidden"
          }

          bg-white
          border-r
          border-gray-200
          transition-all
          duration-300
          sticky
          top-[72px]
          h-[calc(100vh-72px)]
          z-30
        `}
      >

        {/* Fixed width content so animation works properly */}

        <div className="w-[290px] h-full flex flex-col">


          {/* =================================
              SIDEBAR HEADER
          ================================== */}

          <div
            className="
              h-[72px]
              px-5
              border-b
              border-gray-100
              flex
              items-center
              justify-between
              shrink-0
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                "
              >
                <FaHistory className="text-blue-600 text-sm" />
              </div>


              <div>

                <h2 className="font-bold text-gray-800 text-base">
                  History
                </h2>

                <p className="text-xs text-gray-400">
                  Your documents
                </p>

              </div>

            </div>


            {/* Close button */}

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                text-gray-400
                hover:bg-gray-100
                hover:text-gray-700
                transition
              "
              title="Close History"
            >
              <FaTimes size={14} />
            </button>

          </div>


          {/* =================================
              DOCUMENT LIST
          ================================== */}

          <div className="flex-1 overflow-y-auto px-3 py-4">


            {/* Section title */}

            <div className="px-2 mb-3">

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Uploaded Documents
              </p>

            </div>


            {/* =================================
                LOADING STATE
            ================================== */}

            {loading && (
              <div className="space-y-3 px-2">

                <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

                <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

                <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />

              </div>
            )}


            {/* =================================
                EMPTY STATE
            ================================== */}

            {!loading &&
              documents.length === 0 && (
                <div className="px-5 py-10 text-center">

                  <div
                    className="
                      w-12
                      h-12
                      mx-auto
                      rounded-full
                      bg-gray-50
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaHistory className="text-gray-300" />
                  </div>


                  <p className="mt-4 text-sm font-medium text-gray-500">
                    No documents yet
                  </p>


                  <p className="mt-1 text-xs text-gray-400 leading-5">
                    Upload a legal document to see it here.
                  </p>

                </div>
              )}


            {/* =================================
                DOCUMENTS
            ================================== */}

            {!loading &&
              Array.isArray(documents) &&
              documents.map((doc) => (

                <div
                  key={doc.document_id}
                  onClick={() =>
                    onSelectDocument(doc)
                  }
                  className="
                    group
                    mb-2
                    p-3
                    rounded-xl
                    border
                    border-transparent
                    hover:border-blue-100
                    hover:bg-blue-50/60
                    cursor-pointer
                    transition
                  "
                >

                  <div className="flex items-center gap-3">


                    {/* File icon */}

                    {getFileIcon(
                      doc?.filename || ""
                    )}


                    {/* Document information */}

                    <div className="flex-1 min-w-0">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-gray-700
                          truncate
                          group-hover:text-blue-700
                        "
                        title={
                          doc?.filename || ""
                        }
                      >
                        {doc?.filename ||
                          "Untitled Document"}
                      </p>


                      {doc?.created_at && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(
                            doc.created_at
                          ).toLocaleDateString()}
                        </p>
                      )}

                    </div>


                    {/* Actions */}

                    <div className="flex items-center gap-1">


                      {/* Delete */}

                      <button
                        onClick={(event) =>
                          handleDelete(
                            event,
                            doc.document_id
                          )
                        }
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          text-gray-300
                          hover:text-red-500
                          hover:bg-red-50
                          transition
                          opacity-0
                          group-hover:opacity-100
                        "
                        title="Delete document"
                      >
                        <FaTrash size={12} />
                      </button>


                      {/* Arrow */}

                      <FaChevronRight
                        className="
                          text-gray-300
                          group-hover:text-blue-400
                          transition
                        "
                        size={11}
                      />

                    </div>

                  </div>

                </div>

              ))}

          </div>


          {/* =================================
              FOOTER
          ================================== */}

          <div
            className="
              px-4
              py-4
              border-t
              border-gray-100
              shrink-0
            "
          >

            <p className="text-[11px] text-gray-400 text-center leading-4">
              Your uploaded documents are securely stored.
            </p>

          </div>

        </div>

      </aside>

    </>
  );
}


export default Sidebar;
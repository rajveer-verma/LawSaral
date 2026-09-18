// // import { useEffect, useState } from "react";

// // import toast from "react-hot-toast";

// // import Navbar from "../components/Navbar";
// // import Hero from "../components/Hero";
// // import Sidebar from "../components/Sidebar";
// // import UploadSection from "../components/UploadSection";
// // import SummaryCard from "../components/SummaryCard";
// // import DocumentChat from "../components/DocumentChat";
// // import GeneralChat from "../components/GeneralChat";
// // import RiskAnalysis from "../components/RiskAnalysis";

// // import { useAuth } from "../context/AuthContext";


// // function Home() {
// //   const { user } = useAuth();

// //   const [summary, setSummary] =
// //     useState("");

// //   const [documentName, setDocumentName] =
// //     useState("");

// //   const [documentId, setDocumentId] =
// //     useState("");

// //   const [sidebarOpen, setSidebarOpen] =
// //     useState(() => {
// //       const saved =
// //         localStorage.getItem(
// //           "lawsaral-sidebar"
// //         );

// //       return saved === null
// //         ? true
// //         : saved === "true";
// //     });

// //   const [historyRefreshKey, setHistoryRefreshKey] =
// //     useState(0);


// //   useEffect(() => {
// //     if (!user) {
// //       setSummary("");
// //       setDocumentName("");
// //       setDocumentId("");
// //     }
// //   }, [user]);


// //   useEffect(() => {
// //     localStorage.setItem(
// //       "lawsaral-sidebar",
// //       sidebarOpen
// //     );
// //   }, [sidebarOpen]);


// //   const handleUploadSuccess = (data) => {
// //     setSummary(data.summary || "");

// //     setDocumentName(
// //       data.filename || ""
// //     );

// //     setDocumentId(
// //       data.document_id || ""
// //     );

// //     setHistoryRefreshKey(
// //       (prev) => prev + 1
// //     );
// //   };


// //   const handleSelectDocument = (doc) => {
// //     try {
// //       setSummary(
// //         doc.summary || ""
// //       );

// //       setDocumentName(
// //         doc.filename || ""
// //       );

// //       setDocumentId(
// //         doc.document_id || ""
// //       );

// //     } catch (err) {
// //       console.error(
// //         "Document selection error:",
// //         err
// //       );

// //       toast.error(
// //         "Unable to open document."
// //       );
// //     }
// //   };


// //   return (
// //     <div className="min-h-screen bg-slate-100">

// //       <Navbar />


// //       <div className="flex">

// //         {user && (
// //           <Sidebar
// //             sidebarOpen={sidebarOpen}
// //             setSidebarOpen={
// //               setSidebarOpen
// //             }
// //             onSelectDocument={
// //               handleSelectDocument
// //             }
// //             refreshKey={
// //               historyRefreshKey
// //             }
// //           />
// //         )}


// //         <div className="flex-1 min-w-0">

// //           <Hero />


// //           <div className="max-w-7xl mx-auto px-6 pb-16">

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

// //               <UploadSection
// //                 onUploadSuccess={
// //                   handleUploadSuccess
// //                 }
// //               />

// //               <GeneralChat />

// //             </div>


// //             {summary && (
// //               <SummaryCard
// //                 summary={summary}
// //                 filename={documentName}
// //               />
// //             )}


// //             {documentId && (
// //               <RiskAnalysis
// //                 documentId={
// //                   documentId
// //                 }
// //                 filename={
// //                   documentName
// //                 }
// //               />
// //             )}


// //             {documentId && (
// //               <div className="mt-10">

// //                 <DocumentChat
// //                   documentId={
// //                     documentId
// //                   }
// //                 />

// //               </div>
// //             )}

// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }


// // export default Home;


// import { useEffect, useState } from "react";

// import toast from "react-hot-toast";

// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Sidebar from "../components/Sidebar";
// import UploadSection from "../components/UploadSection";
// import SummaryCard from "../components/SummaryCard";
// import DocumentChat from "../components/DocumentChat";
// import GeneralChat from "../components/GeneralChat";
// import RiskAnalysis from "../components/RiskAnalysis";

// import { useAuth } from "../context/AuthContext";


// function Home() {
//   const { user } = useAuth();


//   const [summary, setSummary] =
//     useState("");

//   const [documentName, setDocumentName] =
//     useState("");

//   const [documentId, setDocumentId] =
//     useState("");


//   const [sidebarOpen, setSidebarOpen] =
//     useState(() => {
//       const saved =
//         localStorage.getItem(
//           "lawsaral-sidebar"
//         );

//       return saved === null
//         ? true
//         : saved === "true";
//     });


//   const [historyRefreshKey, setHistoryRefreshKey] =
//     useState(0);


//   // ==========================================
//   // CLEAR DOCUMENT WHEN USER LOGS OUT
//   // ==========================================

//   useEffect(() => {
//     if (!user) {
//       setSummary("");
//       setDocumentName("");
//       setDocumentId("");
//     }
//   }, [user]);


//   // ==========================================
//   // SAVE SIDEBAR STATE
//   // ==========================================

//   useEffect(() => {
//     localStorage.setItem(
//       "lawsaral-sidebar",
//       sidebarOpen
//     );
//   }, [sidebarOpen]);


//   // ==========================================
//   // UPLOAD SUCCESS
//   // ==========================================

//   const handleUploadSuccess = (data) => {
//     setSummary(
//       data?.summary || ""
//     );

//     setDocumentName(
//       data?.filename || ""
//     );

//     setDocumentId(
//       data?.document_id || ""
//     );

//     setHistoryRefreshKey(
//       (prev) => prev + 1
//     );
//   };


//   // ==========================================
//   // SELECT DOCUMENT FROM HISTORY
//   // ==========================================

//   const handleSelectDocument = (doc) => {
//     try {
//       setSummary(
//         doc?.summary || ""
//       );

//       setDocumentName(
//         doc?.filename || ""
//       );

//       setDocumentId(
//         doc?.document_id || ""
//       );

//     } catch (err) {
//       console.error(
//         "Document selection error:",
//         err
//       );

//       toast.error(
//         "Unable to open document."
//       );
//     }
//   };


//   // ==========================================
//   // DELETE SELECTED DOCUMENT
//   // ==========================================

//   const handleDeleteDocument = (
//     deletedDocumentId
//   ) => {
//     if (
//       deletedDocumentId === documentId
//     ) {
//       setSummary("");
//       setDocumentName("");
//       setDocumentId("");
//     }
//   };


//   return (
//     <div className="min-h-screen bg-slate-100">

//       <Navbar />


//       <div className="flex">

//         {user && (
//           <Sidebar
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={
//               setSidebarOpen
//             }
//             onSelectDocument={
//               handleSelectDocument
//             }
//             onDeleteDocument={
//               handleDeleteDocument
//             }
//             refreshKey={
//               historyRefreshKey
//             }
//           />
//         )}


//         <div className="flex-1 min-w-0">

//           <Hero />


//           <div className="max-w-7xl mx-auto px-6 pb-16">

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

//               <UploadSection
//                 onUploadSuccess={
//                   handleUploadSuccess
//                 }
//               />

//               <GeneralChat />

//             </div>


//             {summary && (
//               <SummaryCard
//                 summary={summary}
//                 filename={documentName}
//               />
//             )}


//             {documentId && (
//               <RiskAnalysis
//                 documentId={
//                   documentId
//                 }
//                 filename={
//                   documentName
//                 }
//               />
//             )}


//             {documentId && (
//               <div className="mt-10">

//                 <DocumentChat
//                   documentId={
//                     documentId
//                   }
//                 />

//               </div>
//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default Home; 

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import UploadSection from "../components/UploadSection";
import SummaryCard from "../components/SummaryCard";
import DocumentChat from "../components/DocumentChat";
import GeneralChat from "../components/GeneralChat";
import RiskAnalysis from "../components/RiskAnalysis";

import { useAuth } from "../context/AuthContext";


function Home() {
  const { user } = useAuth();


  const [summary, setSummary] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentId, setDocumentId] = useState("");


  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved =
      localStorage.getItem(
        "lawsaral-sidebar"
      );

    return saved === null
      ? true
      : saved === "true";
  });


  const [historyRefreshKey, setHistoryRefreshKey] =
    useState(0);


  // ==========================================
  // CLEAR DOCUMENT WHEN USER LOGS OUT
  // ==========================================
  useEffect(() => {
    if (!user) {
      setSummary("");
      setDocumentName("");
      setDocumentId("");
    }
  }, [user]);


  // ==========================================
  // RESTORE SELECTED DOCUMENT AFTER REFRESH
  // ==========================================
  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const storageKey =
      `lawsaral-selected-document-${user.uid}`;

    try {
      const savedDocument =
        localStorage.getItem(storageKey);

      if (!savedDocument) {
        return;
      }

      const document =
        JSON.parse(savedDocument);

      if (!document?.documentId) {
        return;
      }

      setDocumentId(
        document.documentId
      );

      setDocumentName(
        document.documentName || ""
      );

      setSummary(
        document.summary || ""
      );

    } catch (err) {
      console.error(
        "Selected document restore error:",
        err
      );

      localStorage.removeItem(
        storageKey
      );
    }
  }, [user]);


  // ==========================================
  // SAVE SIDEBAR STATE
  // ==========================================
  useEffect(() => {
    localStorage.setItem(
      "lawsaral-sidebar",
      sidebarOpen
    );
  }, [sidebarOpen]);


  // ==========================================
  // SAVE SELECTED DOCUMENT
  // ==========================================
  const saveSelectedDocument = (
    id,
    name,
    documentSummary
  ) => {
    if (!user?.uid || !id) {
      return;
    }

    const storageKey =
      `lawsaral-selected-document-${user.uid}`;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        documentId: id,
        documentName: name || "",
        summary: documentSummary || "",
      })
    );
  };


  // ==========================================
  // UPLOAD SUCCESS
  // ==========================================
  const handleUploadSuccess = (data) => {
    const newDocumentId =
      data?.document_id || "";

    const newDocumentName =
      data?.filename || "";

    const newSummary =
      data?.summary || "";

    setSummary(newSummary);

    setDocumentName(
      newDocumentName
    );

    setDocumentId(
      newDocumentId
    );

    saveSelectedDocument(
      newDocumentId,
      newDocumentName,
      newSummary
    );

    setHistoryRefreshKey(
      (prev) => prev + 1
    );
  };


  // ==========================================
  // SELECT DOCUMENT FROM HISTORY
  // ==========================================
  const handleSelectDocument = (doc) => {
    try {
      const selectedDocumentId =
        doc?.document_id || "";

      const selectedDocumentName =
        doc?.filename || "";

      const selectedSummary =
        doc?.summary || "";

      setSummary(
        selectedSummary
      );

      setDocumentName(
        selectedDocumentName
      );

      setDocumentId(
        selectedDocumentId
      );

      saveSelectedDocument(
        selectedDocumentId,
        selectedDocumentName,
        selectedSummary
      );

    } catch (err) {
      console.error(
        "Document selection error:",
        err
      );

      toast.error(
        "Unable to open document."
      );
    }
  };


  // ==========================================
  // DELETE SELECTED DOCUMENT
  // ==========================================
  const handleDeleteDocument = (
    deletedDocumentId
  ) => {
    if (
      deletedDocumentId === documentId
    ) {
      setSummary("");
      setDocumentName("");
      setDocumentId("");

      if (user?.uid) {
        localStorage.removeItem(
          `lawsaral-selected-document-${user.uid}`
        );
      }
    }
  };


  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />


      <div className="flex">

        {user && (
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={
              setSidebarOpen
            }
            onSelectDocument={
              handleSelectDocument
            }
            onDeleteDocument={
              handleDeleteDocument
            }
            refreshKey={
              historyRefreshKey
            }
          />
        )}


        <div className="flex-1 min-w-0">

          <Hero />


          <div className="max-w-7xl mx-auto px-6 pb-16">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <UploadSection
                onUploadSuccess={
                  handleUploadSuccess
                }
              />

              <GeneralChat />

            </div>


            {summary && (
              <SummaryCard
                summary={summary}
                filename={documentName}
              />
            )}


            {documentId && (
              <RiskAnalysis
                documentId={
                  documentId
                }
                filename={
                  documentName
                }
              />
            )}


            {documentId && (
              <div className="mt-10">

                <DocumentChat
                  documentId={
                    documentId
                  }
                />

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


export default Home;
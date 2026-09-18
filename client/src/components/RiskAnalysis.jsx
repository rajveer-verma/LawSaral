

// import { useEffect, useState } from "react";

// import {
//   FaExclamationTriangle,
//   FaRobot,
//   FaCopy,
// } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import toast from "react-hot-toast";

// import {
//   analyzeDocumentRisk,
//   getRiskHistory,
// } from "../services/api";


// function RiskAnalysis({ documentId, filename }) {
//   const [analysis, setAnalysis] = useState("");
//   const [loading, setLoading] = useState(false);


//   // ==========================================
//   // LOAD PREVIOUS RISK ANALYSIS
//   // ==========================================
//   useEffect(() => {
//     if (!documentId) {
//       setAnalysis("");
//       return;
//     }

//     const loadRiskHistory = async () => {
//       try {
//         setAnalysis("");

//         const res = await getRiskHistory(documentId);

//         const analyses = res?.data?.analyses;

//         if (!Array.isArray(analyses) || analyses.length === 0) {
//           return;
//         }

//         // Backend sorts latest analysis first.
//         const latestAnalysis = analyses[0];

//         const previousAnswer =
//           typeof latestAnalysis?.answer === "string"
//             ? latestAnalysis.answer
//             : "";

//         if (previousAnswer) {
//           setAnalysis(previousAnswer);
//         }
//       } catch (err) {
//         console.error(
//           "Risk history loading error:",
//           err
//         );
//       }
//     };

//     loadRiskHistory();
//   }, [documentId]);


//   // ==========================================
//   // ANALYZE RISKS
//   // ==========================================
//   const analyzeRisks = async () => {
//     if (!documentId || loading) {
//       return;
//     }

//     try {
//       setLoading(true);

//       // Clear previous report while generating
//       setAnalysis("");

//       const res = await analyzeDocumentRisk(
//         documentId
//       );

//       const data = res?.data;

//       const result =
//         data?.analysis ||
//         data?.answer ||
//         "";

//       if (!result) {
//         throw new Error(
//           "No risk analysis was returned."
//         );
//       }

//       setAnalysis(result);

//       toast.success(
//         "Risk analysis completed"
//       );
//     } catch (err) {
//       console.error(
//         "Risk analysis error:",
//         err
//       );

//       const message =
//         err?.response?.data?.detail ||
//         err?.message ||
//         "Unable to analyze document risks.";

//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ==========================================
//   // COPY ANALYSIS
//   // ==========================================
//   const copyAnalysis = async () => {
//     if (!analysis) {
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(
//         analysis
//       );

//       toast.success(
//         "Risk report copied"
//       );
//     } catch (err) {
//       console.error(
//         "Copy Risk Report Error:",
//         err
//       );

//       toast.error(
//         "Failed to copy risk report"
//       );
//     }
//   };


//   // ==========================================
//   // NO DOCUMENT
//   // ==========================================
//   if (!documentId) {
//     return null;
//   }


//   // ==========================================
//   // UI
//   // ==========================================
//   return (
//     <div className="bg-white rounded-2xl shadow-lg border p-8 mt-10">

//       {/* =====================================
//           HEADER
//       ====================================== */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//         <div className="flex items-start gap-4">

//           <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
//             <FaExclamationTriangle
//               className="text-red-600"
//               size={24}
//             />
//           </div>


//           <div>

//             <h2 className="text-2xl font-bold text-gray-800">
//               Analyze Legal Risks
//             </h2>

//             <p className="text-gray-500 mt-1 max-w-2xl">
//               Identify potentially risky clauses,
//               liability exposure, termination conditions,
//               indemnification obligations, and other
//               important areas to review.
//             </p>

//             {filename && (
//               <p className="text-sm text-gray-400 mt-2">
//                 Document: {filename}
//               </p>
//             )}

//           </div>

//         </div>


//         {/* Analyze Button */}

//         <button
//           onClick={analyzeRisks}
//           disabled={loading}
//           className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold transition shrink-0"
//         >
//           <FaExclamationTriangle />

//           {loading
//             ? "Analyzing..."
//             : "Analyze Risks"}
//         </button>

//       </div>


//       {/* =====================================
//           LOADING
//       ====================================== */}

//       {loading && (
//         <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-5 flex items-center gap-3">

//           <FaRobot
//             className="text-red-600 animate-pulse"
//             size={22}
//           />

//           <div>

//             <p className="font-semibold text-gray-700">
//               AI is analyzing your document...
//             </p>

//             <p className="text-sm text-gray-500 mt-1">
//               Reviewing potentially important
//               clauses and identifying areas that
//               may require attention.
//             </p>

//           </div>

//         </div>
//       )}


//       {/* =====================================
//           ANALYSIS REPORT
//       ====================================== */}

//       {analysis && !loading && (
//         <div className="mt-8">

//           <div className="flex items-center justify-between mb-4">

//             <div className="flex items-center gap-3">

//               <FaRobot
//                 className="text-red-600"
//                 size={24}
//               />

//               <h3 className="text-xl font-bold text-gray-800">
//                 Risk Analysis Report
//               </h3>

//             </div>


//             {/* Copy */}

//             <button
//               onClick={copyAnalysis}
//               className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
//             >
//               <FaCopy />
//               Copy
//             </button>

//           </div>


//           {/* Report */}

//           <div className="bg-slate-50 border rounded-xl p-6 max-h-[700px] overflow-y-auto">

//             <div className="prose prose-slate max-w-none">

//               <ReactMarkdown
//                 remarkPlugins={[
//                   remarkGfm,
//                 ]}
//               >
//                 {analysis}
//               </ReactMarkdown>

//             </div>

//           </div>


//           {/* Disclaimer */}

//           <p className="text-xs text-gray-400 mt-4">
//             This analysis highlights potential areas
//             for review and is not a substitute for
//             professional legal advice.
//           </p>

//         </div>
//       )}

//     </div>
//   );
// }


// export default RiskAnalysis;


import { useEffect, useState } from "react";

import {
  FaExclamationTriangle,
  FaRobot,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import toast from "react-hot-toast";

import {
  analyzeDocumentRisk,
  getRiskHistory,
} from "../services/api";


// ======================================================
// SAFE CONTENT CONVERTER
// ======================================================

const getMessageContent = (content) => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (
          item &&
          typeof item === "object"
        ) {
          if (typeof item.text === "string") {
            return item.text;
          }

          if (typeof item.content === "string") {
            return item.content;
          }

          if (Array.isArray(item.content)) {
            return getMessageContent(item.content);
          }
        }

        return "";
      })
      .filter(Boolean)
      .join("\n");
  }

  if (
    content &&
    typeof content === "object"
  ) {
    if (typeof content.text === "string") {
      return content.text;
    }

    if (typeof content.content === "string") {
      return content.content;
    }

    if (Array.isArray(content.content)) {
      return getMessageContent(
        content.content
      );
    }

    try {
      return JSON.stringify(content);
    } catch {
      return "";
    }
  }

  return "";
};


function RiskAnalysis({
  documentId,
  filename,
}) {
  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // LOAD PREVIOUS RISK ANALYSIS
  // ==========================================

  useEffect(() => {
    if (!documentId) {
      setAnalysis("");
      return;
    }

    const loadRiskHistory = async () => {
      try {
        setAnalysis("");

        const res =
          await getRiskHistory(
            documentId
          );

        const analyses =
          res?.data?.analyses;

        if (
          !Array.isArray(analyses) ||
          analyses.length === 0
        ) {
          return;
        }

        // Backend sorts latest analysis first.
        const latestAnalysis =
          analyses[0];

        const previousAnswer =
          getMessageContent(
            latestAnalysis?.answer
          );

        if (previousAnswer) {
          setAnalysis(previousAnswer);
        }

      } catch (err) {
        console.error(
          "Risk history loading error:",
          err
        );
      }
    };

    loadRiskHistory();

  }, [documentId]);


  // ==========================================
  // ANALYZE RISKS
  // ==========================================

  const analyzeRisks = async () => {
    if (!documentId || loading) {
      return;
    }

    try {
      setLoading(true);

      // Clear previous report while generating
      setAnalysis("");

      const res =
        await analyzeDocumentRisk(
          documentId
        );

      const data =
        res?.data;

      const rawResult =
        data?.analysis ||
        data?.answer ||
        "";

      // IMPORTANT:
      // Gemini response can be string/object/array.
      // Always convert it to string.
      const result =
        getMessageContent(
          rawResult
        );

      if (!result) {
        throw new Error(
          "No risk analysis was returned."
        );
      }

      setAnalysis(result);

      toast.success(
        "Risk analysis completed"
      );

    } catch (err) {
      console.error(
        "Risk analysis error:",
        err
      );

      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to analyze document risks.";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // COPY ANALYSIS
  // ==========================================

  const copyAnalysis = async () => {
    if (!analysis) {
      return;
    }

    try {
      const safeAnalysis =
        getMessageContent(
          analysis
        );

      await navigator.clipboard.writeText(
        safeAnalysis
      );

      toast.success(
        "Risk report copied"
      );

    } catch (err) {
      console.error(
        "Copy Risk Report Error:",
        err
      );

      toast.error(
        "Failed to copy risk report"
      );
    }
  };


  // ==========================================
  // NO DOCUMENT
  // ==========================================

  if (!documentId) {
    return null;
  }


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 mt-10">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">

            <FaExclamationTriangle
              className="text-red-600"
              size={24}
            />

          </div>


          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Analyze Legal Risks
            </h2>

            <p className="text-gray-500 mt-1 max-w-2xl">
              Identify potentially risky clauses,
              liability exposure, termination conditions,
              indemnification obligations, and other
              important areas to review.
            </p>

            {filename && (
              <p className="text-sm text-gray-400 mt-2">
                Document: {filename}
              </p>
            )}

          </div>

        </div>


        {/* Analyze Button */}

        <button
          onClick={analyzeRisks}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold transition shrink-0"
        >

          <FaExclamationTriangle />

          {loading
            ? "Analyzing..."
            : "Analyze Risks"}

        </button>

      </div>


      {/* =====================================
          LOADING
      ====================================== */}

      {loading && (

        <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-5 flex items-center gap-3">

          <FaRobot
            className="text-red-600 animate-pulse"
            size={22}
          />

          <div>

            <p className="font-semibold text-gray-700">
              AI is analyzing your document...
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Reviewing potentially important
              clauses and identifying areas that
              may require attention.
            </p>

          </div>

        </div>

      )}


      {/* =====================================
          ANALYSIS REPORT
      ====================================== */}

      {analysis && !loading && (

        <div className="mt-8">

          <div className="flex items-center justify-between mb-4">

            <div className="flex items-center gap-3">

              <FaRobot
                className="text-red-600"
                size={24}
              />

              <h3 className="text-xl font-bold text-gray-800">
                Risk Analysis Report
              </h3>

            </div>


            {/* Copy */}

            <button
              onClick={copyAnalysis}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
            >

              <FaCopy />

              Copy

            </button>

          </div>


          {/* Report */}

          <div className="bg-slate-50 border rounded-xl p-6 max-h-[700px] overflow-y-auto">

            <div className="prose prose-slate max-w-none">

              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
              >
                {getMessageContent(
                  analysis
                )}
              </ReactMarkdown>

            </div>

          </div>


          {/* Disclaimer */}

          <p className="text-xs text-gray-400 mt-4">
            This analysis highlights potential areas
            for review and is not a substitute for
            professional legal advice.
          </p>

        </div>

      )}

    </div>
  );
}


export default RiskAnalysis;
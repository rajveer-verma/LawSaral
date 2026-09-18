// import {
//   FaRobot,
//   FaFilePdf,
//   FaCopy,
// } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import removeMarkdown from "remove-markdown";

// import toast from "react-hot-toast";


// function SummaryCard({
//   summary,
//   filename,
// }) {
//   if (!summary) {
//     return null;
//   }


//   const copySummary = async () => {
//     try {
//       const plainText =
//         removeMarkdown(summary).trim();

//       await navigator.clipboard.writeText(
//         plainText
//       );

//       toast.success(
//         "Summary copied"
//       );

//     } catch (err) {
//       console.error(err);

//       toast.error(
//         "Failed to copy summary"
//       );
//     }
//   };


//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

//       <div className="flex justify-between items-start gap-4">

//         <div>

//           <div className="flex items-center gap-3">

//             <FaRobot
//               className="text-blue-600"
//               size={32}
//             />

//             <h2 className="text-3xl font-bold text-blue-700">
//               AI Summary
//             </h2>

//           </div>


//           <div className="flex items-center gap-2 mt-3">

//             <FaFilePdf
//               className="text-red-600"
//             />

//             <span className="text-gray-600 font-medium">
//               {filename}
//             </span>

//           </div>

//         </div>


//         <button
//           onClick={copySummary}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//         >

//           <FaCopy />

//           Copy

//         </button>

//       </div>


//       <div className="mt-8 bg-slate-50 border rounded-xl p-6 max-h-[650px] overflow-y-auto">

//         <div className="prose prose-slate max-w-none">

//           <ReactMarkdown
//             remarkPlugins={[
//               remarkGfm,
//             ]}
//           >
//             {summary}
//           </ReactMarkdown>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default SummaryCard;


import {
  FaRobot,
  FaFilePdf,
  FaFileImage,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import removeMarkdown from "remove-markdown";
import toast from "react-hot-toast";

function SummaryCard({ summary, filename }) {
  if (!summary) {
    return null;
  }

  const isPdf =
    filename?.toLowerCase().endsWith(".pdf");

  const handleCopy = async () => {
    try {
      const plainText = removeMarkdown(summary);

      await navigator.clipboard.writeText(
        plainText
      );

      toast.success("Summary copied to clipboard.");
    } catch (error) {
      console.error(
        "Copy Summary Error:",
        error
      );

      toast.error(
        "Unable to copy summary."
      );
    }
  };

  return (
    <section className="mt-8 bg-white rounded-2xl shadow-sm border p-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">

        <div className="flex items-center gap-3 min-w-0">

          {/* AI Icon */}
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <FaRobot
              className="text-blue-600"
              size={21}
            />
          </div>

          <div className="min-w-0">

            <h2 className="text-2xl font-bold text-gray-800">
              AI Summary
            </h2>

            <div className="flex items-center gap-2 mt-1">

              {isPdf ? (
                <FaFilePdf
                  className="text-red-500"
                  size={13}
                />
              ) : (
                <FaFileImage
                  className="text-blue-500"
                  size={13}
                />
              )}

              <p
                className="text-sm text-gray-500 truncate"
                title={filename || "Uploaded Document"}
              >
                {filename || "Uploaded Document"}
              </p>

            </div>

          </div>
        </div>


        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="
            shrink-0
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            border-gray-200
            text-gray-600
            hover:text-blue-600
            hover:border-blue-200
            hover:bg-blue-50
            transition
            text-sm
            font-medium
          "
        >
          <FaCopy size={13} />
          <span className="hidden sm:inline">
            Copy
          </span>
        </button>

      </div>


      {/* Summary Content */}
      <div
        className="
          max-h-[600px]
          overflow-y-auto
          rounded-xl
          border
          border-gray-100
          bg-slate-50
          p-5
          sm:p-6
        "
      >
        <div
          className="
            prose
            prose-sm
            sm:prose-base
            max-w-none
            text-gray-700
            prose-headings:text-gray-800
            prose-strong:text-gray-800
            prose-a:text-blue-600
            prose-li:my-1
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </div>


      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-4">
        AI-generated summary for document understanding.
        Please review the original document for important details.
      </p>

    </section>
  );
}

export default SummaryCard;
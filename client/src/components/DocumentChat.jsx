// import { useEffect, useRef, useState } from "react";

// import {
//   FaRobot,
//   FaUser,
//   FaCopy,
// } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// import toast from "react-hot-toast";

// import {
//   runAgent,
//   getDocumentChatHistory,
// } from "../services/api";


// function DocumentChat({ documentId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);


//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);


//   useEffect(() => {
//     const loadHistory = async () => {
//       if (!documentId) {
//         setMessages([]);
//         return;
//       }

//       try {
//         const res =
//           await getDocumentChatHistory(
//             documentId
//           );

//         const chats =
//           res.data?.chats || [];

//         const formatted = [];

//         chats.forEach((chat) => {
//           formatted.push({
//             role: "user",
//             content: chat.question,
//           });

//           formatted.push({
//             role: "assistant",
//             content: chat.answer,
//           });
//         });

//         setMessages(formatted);

//       } catch (err) {
//         console.error(
//           "Chat history error:",
//           err
//         );
//       }
//     };

//     loadHistory();
//   }, [documentId]);


//   const handleCopy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);

//       toast.success("Answer copied");

//     } catch (err) {
//       console.error(err);

//       toast.error(
//         "Failed to copy answer"
//       );
//     }
//   };


//   const sendMessage = async () => {
//     const message = input.trim();

//     if (!message || loading || !documentId) {
//       return;
//     }

//     setInput("");

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         content: message,
//       },
//     ]);

//     try {
//       setLoading(true);

//       const res =
//         await runAgent(
//           message,
//           documentId
//         );

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             res.data?.answer ||
//             "I couldn't generate an answer.",
//         },
//       ]);

//     } catch (err) {
//       console.error(
//         "Document chat error:",
//         err
//       );

//       const errorMessage =
//         err.response?.data?.detail ||
//         "Unable to get an answer.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: errorMessage,
//           error: true,
//         },
//       ]);

//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleKeyDown = (e) => {
//     if (
//       e.key === "Enter" &&
//       !e.shiftKey
//     ) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };


//   if (!documentId) {
//     return null;
//   }


//   return (
//     <div className="bg-white rounded-2xl shadow-lg border p-6">

//       <div className="flex items-center gap-3 mb-6">

//         <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

//           <FaRobot
//             className="text-blue-600"
//             size={22}
//           />

//         </div>

//         <div>

//           <h2 className="text-2xl font-bold text-gray-800">
//             Ask About Your Document
//           </h2>

//           <p className="text-sm text-gray-500">
//             Ask questions based on the uploaded legal document.
//           </p>

//         </div>

//       </div>


//       <div className="bg-slate-50 border rounded-xl p-4 h-[500px] overflow-y-auto">

//         {messages.length === 0 && (

//           <div className="h-full flex items-center justify-center text-center">

//             <div>

//               <FaRobot
//                 className="mx-auto text-blue-500"
//                 size={40}
//               />

//               <h3 className="font-semibold text-gray-700 mt-4">
//                 Ask your first question
//               </h3>

//               <p className="text-sm text-gray-500 mt-2 max-w-md">
//                 Ask about termination, payment,
//                 liability, arbitration, notices,
//                 obligations, or any other clause.
//               </p>

//             </div>

//           </div>

//         )}


//         <div className="space-y-5">

//           {messages.map((message, index) => {

//             const isUser =
//               message.role === "user";

//             const containerClass =
//               isUser
//                 ? "flex gap-3 justify-end"
//                 : "flex gap-3 justify-start";

//             const bubbleClass =
//               isUser
//                 ? "max-w-[80%] rounded-2xl px-4 py-3 bg-blue-600 text-white"
//                 : message.error
//                   ? "max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border border-red-200 text-red-700"
//                   : "max-w-[80%] rounded-2xl px-4 py-3 bg-white border text-gray-800";


//             return (
//               <div
//                 key={index}
//                 className={containerClass}
//               >

//                 {!isUser && (

//                   <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                     <FaRobot
//                       className="text-blue-600"
//                       size={18}
//                     />

//                   </div>

//                 )}


//                 <div className={bubbleClass}>

//                   {isUser ? (

//                     <p className="whitespace-pre-wrap">
//                       {message.content}
//                     </p>

//                   ) : (

//                     <div className="prose prose-sm max-w-none">

//                       <ReactMarkdown
//                         remarkPlugins={[
//                           remarkGfm,
//                         ]}
//                       >
//                         {message.content}
//                       </ReactMarkdown>

//                     </div>

//                   )}


//                   {!isUser && (

//                     <button
//                       onClick={() =>
//                         handleCopy(
//                           message.content
//                         )
//                       }
//                       className="mt-3 text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
//                     >

//                       <FaCopy />
//                       Copy

//                     </button>

//                   )}

//                 </div>


//                 {isUser && (

//                   <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">

//                     <FaUser size={16} />

//                   </div>

//                 )}

//               </div>
//             );
//           })}


//           {loading && (

//             <div className="flex gap-3">

//               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                 <FaRobot
//                   className="text-blue-600"
//                   size={18}
//                 />

//               </div>

//               <div className="bg-white border rounded-2xl px-4 py-3 text-gray-500">
//                 Thinking...
//               </div>

//             </div>

//           )}


//           <div ref={messagesEndRef} />

//         </div>

//       </div>


//       <div className="mt-4">

//         <textarea
//           value={input}
//           onChange={(e) =>
//             setInput(e.target.value)
//           }
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//           placeholder="Ask a question about this document..."
//           rows={3}
//           className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//         />


//         <div className="flex justify-between items-center mt-2">

//           <p className="text-xs text-gray-400">
//             Enter to send - Shift + Enter for new line
//           </p>


//           <button
//             onClick={sendMessage}
//             disabled={
//               loading ||
//               !input.trim()
//             }
//             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
//           >
//             {loading
//               ? "Thinking..."
//               : "Ask AI"}
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default DocumentChat;


// import { useEffect, useRef, useState } from "react";

// import {
//   FaRobot,
//   FaUser,
//   FaCopy,
// } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import toast from "react-hot-toast";

// import {
//   runAgent,
//   getDocumentChatHistory,
// } from "../services/api";

// function DocumentChat({ documentId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] =
//     useState(true);

//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);

//   // ==========================================
//   // LOAD CHAT HISTORY
//   // ==========================================

//   useEffect(() => {
//     if (!documentId) {
//       setMessages([]);
//       setHistoryLoading(false);
//       return;
//     }

//     const loadHistory = async () => {
//       try {
//         setHistoryLoading(true);

//         const response =
//           await getDocumentChatHistory(
//             documentId
//           );

//         const history =
//           Array.isArray(response?.data)
//             ? response.data
//             : Array.isArray(response?.data?.history)
//             ? response.data.history
//             : [];

//         const formattedMessages = [];

//         history.forEach((item) => {
//           if (item?.question) {
//             formattedMessages.push({
//               role: "user",
//               content: item.question,
//             });
//           }

//           if (item?.answer) {
//             formattedMessages.push({
//               role: "assistant",
//               content: item.answer,
//             });
//           }
//         });

//         setMessages(formattedMessages);

//       } catch (error) {
//         console.error(
//           "Chat History Error:",
//           error
//         );

//         setMessages([]);

//         toast.error(
//           "Unable to load chat history."
//         );
//       } finally {
//         setHistoryLoading(false);
//       }
//     };

//     loadHistory();
//   }, [documentId]);


//   // ==========================================
//   // AUTO SCROLL
//   // ==========================================

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);


//   // ==========================================
//   // COPY MESSAGE
//   // ==========================================

//   const handleCopy = async (content) => {
//     try {
//       await navigator.clipboard.writeText(
//         content
//       );

//       toast.success(
//         "Copied to clipboard."
//       );
//     } catch (error) {
//       console.error(
//         "Copy Message Error:",
//         error
//       );

//       toast.error(
//         "Unable to copy message."
//       );
//     }
//   };


//   // ==========================================
//   // SEND MESSAGE
//   // ==========================================

//   const sendMessage = async () => {
//     const message = input.trim();

//     if (!message) {
//       return;
//     }

//     if (!documentId) {
//       toast.error(
//         "Please select a document first."
//       );

//       return;
//     }

//     if (loading) {
//       return;
//     }

//     // Add user message immediately
//     setMessages((previous) => [
//       ...previous,
//       {
//         role: "user",
//         content: message,
//       },
//     ]);

//     setInput("");

//     try {
//       setLoading(true);

//       const response =
//         await runAgent(
//           message,
//           documentId
//         );

//       const answer =
//         response?.data?.answer ||
//         "I couldn't find an answer.";

//       setMessages((previous) => [
//         ...previous,
//         {
//           role: "assistant",
//           content: answer,
//         },
//       ]);

//     } catch (error) {
//       console.error(
//         "Agent Error:",
//         error
//       );

//       // Remove user message if request failed
//       setMessages((previous) =>
//         previous.slice(0, -1)
//       );

//       const message =
//         error?.response?.data?.detail ||
//         "Unable to process your question.";

//       toast.error(message);

//     } finally {
//       setLoading(false);
//     }
//   };


//   // ==========================================
//   // ENTER TO SEND
//   // ==========================================

//   const handleKeyDown = (event) => {
//     if (
//       event.key === "Enter" &&
//       !event.shiftKey
//     ) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };


//   // ==========================================
//   // NO DOCUMENT
//   // ==========================================

//   if (!documentId) {
//     return null;
//   }


//   return (
//     <section className="bg-white rounded-2xl shadow-sm border p-6">

//       {/* =====================================
//           HEADER
//       ====================================== */}

//       <div className="flex items-center gap-3 mb-5">

//         <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

//           <FaRobot
//             className="text-blue-600"
//             size={21}
//           />

//         </div>

//         <div>

//           <h2 className="text-2xl font-bold text-gray-800">
//             Chat with Uploaded Document
//           </h2>

//           <p className="text-sm text-gray-500">
//             Ask questions and get answers from your document.
//           </p>

//         </div>

//       </div>


//       {/* =====================================
//           CHAT AREA
//       ====================================== */}

//       <div className="border rounded-xl bg-slate-50 h-[500px] flex flex-col">

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-5 space-y-4">

//           {/* Loading History */}
//           {historyLoading && (
//             <div className="flex justify-center py-10">
//               <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
//             </div>
//           )}


//           {/* Empty Chat */}
//           {!historyLoading &&
//             messages.length === 0 && (
//               <div className="h-full flex flex-col items-center justify-center text-center px-6">

//                 <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
//                   <FaRobot
//                     className="text-blue-600"
//                     size={25}
//                   />
//                 </div>

//                 <h3 className="mt-4 font-semibold text-gray-700">
//                   Ask anything about your document
//                 </h3>

//                 <p className="mt-2 text-sm text-gray-400 max-w-md">
//                   Try asking about important clauses,
//                   obligations, termination, payments,
//                   or other information in the document.
//                 </p>

//               </div>
//             )}


//           {/* Messages */}
//           {!historyLoading &&
//             messages.map((message, index) => {

//               const isUser =
//                 message.role === "user";

//               return (
//                 <div
//                   key={`${message.role}-${index}`}
//                   className={`flex ${
//                     isUser
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >

//                   <div
//                     className={`
//                       flex
//                       gap-3
//                       max-w-[85%]
//                       ${
//                         isUser
//                           ? "flex-row-reverse"
//                           : ""
//                       }
//                     `}
//                   >

//                     {/* Avatar */}
//                     <div
//                       className={`
//                         w-8
//                         h-8
//                         rounded-full
//                         flex
//                         items-center
//                         justify-center
//                         shrink-0
//                         ${
//                           isUser
//                             ? "bg-blue-600 text-white"
//                             : "bg-blue-100 text-blue-600"
//                         }
//                       `}
//                     >
//                       {isUser ? (
//                         <FaUser size={13} />
//                       ) : (
//                         <FaRobot size={13} />
//                       )}
//                     </div>


//                     {/* Message */}
//                     <div
//                       className={`
//                         rounded-2xl
//                         px-4
//                         py-3
//                         text-sm
//                         leading-6
//                         ${
//                           isUser
//                             ? "bg-blue-600 text-white"
//                             : "bg-white border border-gray-200 text-gray-700"
//                         }
//                       `}
//                     >

//                       {isUser ? (
//                         <p className="whitespace-pre-wrap">
//                           {message.content}
//                         </p>
//                       ) : (
//                         <div className="relative">

//                           <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800 prose-p:my-2 prose-li:my-1">
//                             <ReactMarkdown
//                               remarkPlugins={[
//                                 remarkGfm,
//                               ]}
//                             >
//                               {message.content}
//                             </ReactMarkdown>
//                           </div>

//                           {/* Copy */}
//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleCopy(
//                                 message.content
//                               )
//                             }
//                             className="mt-2 text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 transition"
//                           >
//                             <FaCopy size={11} />
//                             Copy
//                           </button>

//                         </div>
//                       )}

//                     </div>

//                   </div>
//                 </div>
//               );
//             })}


//           {/* =================================
//               AI TYPING
//           ================================== */}

//           {loading && (
//             <div className="flex justify-start">

//               <div className="flex gap-3">

//                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
//                   <FaRobot size={13} />
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3">

//                   <div className="flex items-center gap-1">
//                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
//                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
//                   </div>

//                 </div>

//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />

//         </div>


//         {/* =====================================
//             INPUT
//         ====================================== */}

//         <div className="border-t bg-white p-4 rounded-b-xl">

//           <div className="flex gap-3 items-end">

//             <textarea
//               ref={textareaRef}
//               value={input}
//               onChange={(event) =>
//                 setInput(event.target.value)
//               }
//               onKeyDown={handleKeyDown}
//               disabled={loading}
//               rows={2}
//               placeholder="Ask a question about this document..."
//               className="
//                 flex-1
//                 resize-none
//                 border
//                 border-gray-200
//                 rounded-xl
//                 px-4
//                 py-3
//                 text-sm
//                 text-gray-700
//                 placeholder-gray-400
//                 outline-none
//                 focus:border-blue-400
//                 focus:ring-2
//                 focus:ring-blue-100
//                 disabled:bg-gray-100
//               "
//             />

//             <button
//               type="button"
//               onClick={sendMessage}
//               disabled={
//                 loading ||
//                 !input.trim()
//               }
//               className="
//                 bg-blue-600
//                 hover:bg-blue-700
//                 disabled:bg-gray-300
//                 text-white
//                 px-5
//                 py-3
//                 rounded-xl
//                 font-semibold
//                 text-sm
//                 transition
//               "
//             >
//               {loading
//                 ? "Asking..."
//                 : "Ask AI"}
//             </button>

//           </div>

//           <p className="text-[11px] text-gray-400 mt-2">
//             Press Enter to send • Shift + Enter for a new line
//           </p>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default DocumentChat;


// import { useEffect, useRef, useState } from "react";

// import {
//   FaRobot,
//   FaUser,
//   FaCopy,
// } from "react-icons/fa";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import toast from "react-hot-toast";

// import {
//   runAgent,
//   getDocumentChatHistory,
// } from "../services/api";


// function DocumentChat({ documentId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);


//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);


//   useEffect(() => {
//     const loadHistory = async () => {

//       // Clear old document's messages immediately
//       setMessages([]);

//       if (!documentId) {
//         return;
//       }

//       try {
//         const res =
//           await getDocumentChatHistory(
//             documentId
//           );

//         const chats =
//           res?.data?.chats || [];

//         const formatted = [];

//         chats.forEach((chat) => {
//           formatted.push({
//             role: "user",
//             content: chat.question,
//           });

//           formatted.push({
//             role: "assistant",
//             content: chat.answer,
//           });
//         });

//         setMessages(formatted);

//       } catch (err) {
//         console.error(
//           "Chat history error:",
//           err
//         );
//       }
//     };

//     loadHistory();
//   }, [documentId]);


//   const handleCopy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);

//       toast.success(
//         "Answer copied"
//       );

//     } catch (err) {
//       console.error(err);

//       toast.error(
//         "Failed to copy answer"
//       );
//     }
//   };


//   const sendMessage = async () => {
//     const message = input.trim();

//     if (!message || loading || !documentId) {
//       return;
//     }

//     setInput("");

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         content: message,
//       },
//     ]);

//     try {
//       setLoading(true);

//       const res =
//         await runAgent(
//           message,
//           documentId
//         );

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             res?.data?.answer ||
//             "I couldn't generate an answer.",
//         },
//       ]);

//     } catch (err) {
//       console.error(
//         "Document chat error:",
//         err
//       );

//       const errorMessage =
//         err?.response?.data?.detail ||
//         "Unable to get an answer.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: errorMessage,
//           error: true,
//         },
//       ]);

//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleKeyDown = (e) => {
//     if (
//       e.key === "Enter" &&
//       !e.shiftKey
//     ) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };


//   if (!documentId) {
//     return null;
//   }


//   return (
//     <div className="bg-white rounded-2xl shadow-lg border p-6">

//       <div className="flex items-center gap-3 mb-6">

//         <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

//           <FaRobot
//             className="text-blue-600"
//             size={22}
//           />

//         </div>

//         <div>

//           <h2 className="text-2xl font-bold text-gray-800">
//             Ask About Your Document
//           </h2>

//           <p className="text-sm text-gray-500">
//             Ask questions based on the uploaded legal document.
//           </p>

//         </div>

//       </div>


//       <div className="bg-slate-50 border rounded-xl p-4 h-[500px] overflow-y-auto">

//         {messages.length === 0 && (
//           <div className="h-full flex items-center justify-center text-center">

//             <div>

//               <FaRobot
//                 className="mx-auto text-blue-500"
//                 size={40}
//               />

//               <h3 className="font-semibold text-gray-700 mt-4">
//                 Ask your first question
//               </h3>

//               <p className="text-sm text-gray-500 mt-2 max-w-md">
//                 Ask about termination, payment,
//                 liability, arbitration, notices,
//                 obligations, or any other clause.
//               </p>

//             </div>

//           </div>
//         )}


//         <div className="space-y-5">

//           {messages.map((message, index) => {

//             const isUser =
//               message.role === "user";

//             const containerClass =
//               isUser
//                 ? "flex gap-3 justify-end"
//                 : "flex gap-3 justify-start";

//             const bubbleClass =
//               isUser
//                 ? "max-w-[80%] rounded-2xl px-4 py-3 bg-blue-600 text-white"
//                 : message.error
//                   ? "max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border border-red-200 text-red-700"
//                   : "max-w-[80%] rounded-2xl px-4 py-3 bg-white border text-gray-800";


//             return (
//               <div
//                 key={index}
//                 className={containerClass}
//               >

//                 {!isUser && (
//                   <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                     <FaRobot
//                       className="text-blue-600"
//                       size={18}
//                     />

//                   </div>
//                 )}


//                 <div className={bubbleClass}>

//                   {isUser ? (
//                     <p className="whitespace-pre-wrap">
//                       {message.content}
//                     </p>
//                   ) : (
//                     <div className="prose prose-sm max-w-none">

//                       <ReactMarkdown
//                         remarkPlugins={[
//                           remarkGfm,
//                         ]}
//                       >
//                         {message.content}
//                       </ReactMarkdown>

//                     </div>
//                   )}


//                   {!isUser && (
//                     <button
//                       onClick={() =>
//                         handleCopy(
//                           message.content
//                         )
//                       }
//                       className="mt-3 text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
//                     >
//                       <FaCopy />
//                       Copy
//                     </button>
//                   )}

//                 </div>


//                 {isUser && (
//                   <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">

//                     <FaUser size={16} />

//                   </div>
//                 )}

//               </div>
//             );
//           })}


//           {loading && (
//             <div className="flex gap-3">

//               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                 <FaRobot
//                   className="text-blue-600"
//                   size={18}
//                 />

//               </div>

//               <div className="bg-white border rounded-2xl px-4 py-3 text-gray-500">
//                 Thinking...
//               </div>

//             </div>
//           )}


//           <div ref={messagesEndRef} />

//         </div>

//       </div>


//       <div className="mt-4">

//         <textarea
//           value={input}
//           onChange={(e) =>
//             setInput(e.target.value)
//           }
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//           placeholder="Ask a question about this document..."
//           rows={3}
//           className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//         />


//         <div className="flex justify-between items-center mt-2">

//           <p className="text-xs text-gray-400">
//             Enter to send - Shift + Enter for new line
//           </p>


//           <button
//             onClick={sendMessage}
//             disabled={
//               loading ||
//               !input.trim()
//             }
//             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
//           >
//             {loading
//               ? "Thinking..."
//               : "Ask AI"}
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default DocumentChat;/

// import { useEffect, useRef, useState } from "react";
// import {
//   FaRobot,
//   FaUser,
//   FaCopy,
// } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import toast from "react-hot-toast";
// import {
//   runAgent,
//   getDocumentChatHistory,
// } from "../services/api";


/* ============================================================
   Safely convert AI/API content into a string
   ============================================================ */

// const getMessageContent = (content) => {
//   if (typeof content === "string") {
//     return content;
//   }

//   if (Array.isArray(content)) {
//     return content
//       .map((item) => {
//         if (typeof item === "string") {
//           return item;
//         }

//         if (item && typeof item === "object") {
//           if (typeof item.text === "string") {
//             return item.text;
//           }

//           if (typeof item.content === "string") {
//             return item.content;
//           }
//         }

//         return "";
//       })
//       .filter(Boolean)
//       .join("\n");
//   }

//   if (content && typeof content === "object") {
//     if (typeof content.text === "string") {
//       return content.text;
//     }

//     if (typeof content.content === "string") {
//       return content.content;
//     }

//     return JSON.stringify(content);
//   }

//   return "";
// };


// function DocumentChat({ documentId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);


//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);


//   useEffect(() => {
//     const loadHistory = async () => {
//       // Clear old document's messages immediately
//       setMessages([]);

//       if (!documentId) {
//         return;
//       }

//       try {
//         const res =
//           await getDocumentChatHistory(
//             documentId
//           );

//         const chats =
//           res?.data?.chats || [];

//         const formatted = [];

//         chats.forEach((chat) => {
//           formatted.push({
//             role: "user",
//             content: getMessageContent(
//               chat?.question
//             ),
//           });

//           formatted.push({
//             role: "assistant",
//             content: getMessageContent(
//               chat?.answer
//             ),
//           });
//         });

//         setMessages(formatted);
//       } catch (err) {
//         console.error(
//           "Chat history error:",
//           err
//         );
//       }
//     };

//     loadHistory();
//   }, [documentId]);


//   const handleCopy = async (text) => {
//     try {
//       const safeText =
//         getMessageContent(text);

//       await navigator.clipboard.writeText(
//         safeText
//       );

//       toast.success(
//         "Answer copied"
//       );
//     } catch (err) {
//       console.error(err);

//       toast.error(
//         "Failed to copy answer"
//       );
//     }
//   };


//   const sendMessage = async () => {
//     const message = input.trim();

//     if (
//       !message ||
//       loading ||
//       !documentId
//     ) {
//       return;
//     }

//     setInput("");

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         content: message,
//       },
//     ]);

//     try {
//       setLoading(true);

//       const res =
//         await runAgent(
//           message,
//           documentId
//         );

//       const answer =
//         getMessageContent(
//           res?.data?.answer
//         );

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             answer ||
//             "I couldn't generate an answer.",
//         },
//       ]);
//     } catch (err) {
//       console.error(
//         "Document chat error:",
//         err
//       );

//       const errorMessage =
//         err?.response?.data?.detail ||
//         "Unable to get an answer.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             getMessageContent(
//               errorMessage
//             ),
//           error: true,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleKeyDown = (e) => {
//     if (
//       e.key === "Enter" &&
//       !e.shiftKey
//     ) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };


//   if (!documentId) {
//     return null;
//   }


//   return (
//     <div className="bg-white rounded-2xl shadow-lg border p-6">

//       <div className="flex items-center gap-3 mb-6">

//         <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
//           <FaRobot
//             className="text-blue-600"
//             size={22}
//           />
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Ask About Your Document
//           </h2>

//           <p className="text-sm text-gray-500">
//             Ask questions based on the uploaded legal document.
//           </p>
//         </div>

//       </div>


//       <div className="bg-slate-50 border rounded-xl p-4 h-[500px] overflow-y-auto">

//         {messages.length === 0 && (
//           <div className="h-full flex items-center justify-center text-center">

//             <div>

//               <FaRobot
//                 className="mx-auto text-blue-500"
//                 size={40}
//               />

//               <h3 className="font-semibold text-gray-700 mt-4">
//                 Ask your first question
//               </h3>

//               <p className="text-sm text-gray-500 mt-2 max-w-md">
//                 Ask about termination, payment,
//                 liability, arbitration, notices,
//                 obligations, or any other clause.
//               </p>

//             </div>

//           </div>
//         )}


//         <div className="space-y-5">

//           {messages.map((message, index) => {

//             const isUser =
//               message.role === "user";

//             const containerClass =
//               isUser
//                 ? "flex gap-3 justify-end"
//                 : "flex gap-3 justify-start";

//             const bubbleClass =
//               isUser
//                 ? "max-w-[80%] rounded-2xl px-4 py-3 bg-blue-600 text-white"
//                 : message.error
//                 ? "max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border border-red-200 text-red-700"
//                 : "max-w-[80%] rounded-2xl px-4 py-3 bg-white border text-gray-800";

//             const safeContent =
//               getMessageContent(
//                 message.content
//               );


//             return (
//               <div
//                 key={index}
//                 className={containerClass}
//               >

//                 {!isUser && (
//                   <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                     <FaRobot
//                       className="text-blue-600"
//                       size={18}
//                     />

//                   </div>
//                 )}


//                 <div className={bubbleClass}>

//                   {isUser ? (
//                     <p className="whitespace-pre-wrap">
//                       {safeContent}
//                     </p>
//                   ) : (
//                     <div className="prose prose-sm max-w-none">

//                       <ReactMarkdown
//                         remarkPlugins={[
//                           remarkGfm,
//                         ]}
//                       >
//                         {safeContent}
//                       </ReactMarkdown>

//                     </div>
//                   )}


//                   {!isUser && (
//                     <button
//                       onClick={() =>
//                         handleCopy(
//                           safeContent
//                         )
//                       }
//                       className="mt-3 text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
//                     >
//                       <FaCopy />
//                       Copy
//                     </button>
//                   )}

//                 </div>


//                 {isUser && (
//                   <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">

//                     <FaUser size={16} />

//                   </div>
//                 )}

//               </div>
//             );
//           })}


//           {loading && (
//             <div className="flex gap-3">

//               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

//                 <FaRobot
//                   className="text-blue-600"
//                   size={18}
//                 />

//               </div>

//               <div className="bg-white border rounded-2xl px-4 py-3 text-gray-500">
//                 Thinking...
//               </div>

//             </div>
//           )}


//           <div ref={messagesEndRef} />

//         </div>

//       </div>


//       <div className="mt-4">

//         <textarea
//           value={input}
//           onChange={(e) =>
//             setInput(
//               e.target.value
//             )
//           }
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//           placeholder="Ask a question about this document..."
//           rows={3}
//           className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//         />


//         <div className="flex justify-between items-center mt-2">

//           <p className="text-xs text-gray-400">
//             Enter to send - Shift + Enter for new line
//           </p>


//           <button
//             onClick={sendMessage}
//             disabled={
//               loading ||
//               !input.trim()
//             }
//             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
//           >
//             {loading
//               ? "Thinking..."
//               : "Ask AI"}
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default DocumentChat;





import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaCopy,
  FaUser,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

import {
  runAgent,
  getDocumentChatHistory,
} from "../services/api";

import { auth } from "../firebase";


// ======================================================
// ALWAYS CONVERT MESSAGE CONTENT INTO STRING
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
      return getMessageContent(content.content);
    }

    try {
      return JSON.stringify(content);
    } catch {
      return "";
    }
  }

  return "";
};


// ======================================================
// COMPONENT
// ======================================================

function DocumentChat({ documentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);


  // ======================================================
  // AUTO SCROLL
  // ======================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  // ======================================================
  // LOAD CHAT HISTORY
  // ======================================================

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      setMessages([]);

      if (!documentId) {
        return;
      }

      try {
        let res;

        try {
          // First attempt
          res = await getDocumentChatHistory(
            documentId
          );
        } catch (firstError) {
          // ----------------------------------------------
          // If token is rejected, refresh Firebase token
          // and retry once.
          // ----------------------------------------------

          if (
            firstError?.response?.status === 401 &&
            auth.currentUser
          ) {
            console.log(
              "Chat history token expired. Refreshing Firebase token..."
            );

            await auth.currentUser.getIdToken(true);

            res = await getDocumentChatHistory(
              documentId
            );
          } else {
            throw firstError;
          }
        }

        if (cancelled) {
          return;
        }

        const chats =
          res?.data?.chats || [];

        const formatted = [];

        chats.forEach((chat) => {
          const question =
            getMessageContent(
              chat?.question
            );

          const answer =
            getMessageContent(
              chat?.answer
            );

          if (question) {
            formatted.push({
              role: "user",
              content: question,
            });
          }

          if (answer) {
            formatted.push({
              role: "assistant",
              content: answer,
            });
          }
        });

        if (!cancelled) {
          setMessages(formatted);
        }

      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Chat history error:",
          err
        );

        // ------------------------------------------------
        // IMPORTANT:
        // History failure should NOT crash the page.
        // User can still ask a new question.
        // ------------------------------------------------

        setMessages([]);

        if (
          err?.response?.status === 401
        ) {
          console.warn(
            "Chat history authorization failed."
          );
        }
      }
    };

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, [documentId]);


  // ======================================================
  // COPY ANSWER
  // ======================================================

  const handleCopy = async (text) => {
    try {
      const safeText =
        getMessageContent(text);

      if (!safeText) {
        return;
      }

      await navigator.clipboard.writeText(
        safeText
      );

      toast.success(
        "Answer copied"
      );

    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to copy answer"
      );
    }
  };


  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage = async () => {
    const message =
      input.trim();

    if (
      !message ||
      loading ||
      !documentId
    ) {
      return;
    }

    setInput("");

    // ----------------------------------------------------
    // Add user message immediately
    // ----------------------------------------------------

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      setLoading(true);

      const res = await runAgent(
        message,
        documentId
      );

      const answer =
        getMessageContent(
          res?.data?.answer
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            answer ||
            "I couldn't generate an answer.",
        },
      ]);

    } catch (err) {
      console.error(
        "Document chat error:",
        err
      );

      const errorMessage =
        err?.response?.data?.detail ||
        "Unable to get an answer.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            getMessageContent(
              errorMessage
            ),
          error: true,
        },
      ]);

    } finally {
      setLoading(false);
    }
  };


  // ======================================================
  // ENTER KEY
  // ======================================================

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };


  // ======================================================
  // NO DOCUMENT
  // ======================================================

  if (!documentId) {
    return null;
  }


  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

          <FaRobot
            className="text-blue-600"
            size={22}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Ask About Your Document
          </h2>

          <p className="text-sm text-gray-500">
            Ask questions based on the uploaded legal document.
          </p>

        </div>

      </div>


      {/* ==================================================
          CHAT AREA
      ================================================== */}

      <div className="bg-slate-50 border rounded-xl p-4 h-[500px] overflow-y-auto">

        {messages.length === 0 && (

          <div className="h-full flex items-center justify-center text-center">

            <div>

              <FaRobot
                className="mx-auto text-blue-500"
                size={40}
              />

              <h3 className="font-semibold text-gray-700 mt-4">
                Ask your first question
              </h3>

              <p className="text-sm text-gray-500 mt-2 max-w-md">
                Ask about termination, payment,
                liability, arbitration, notices,
                obligations, or any other clause.
              </p>

            </div>

          </div>

        )}


        <div className="space-y-5">

          {messages.map(
            (message, index) => {

              const isUser =
                message.role === "user";

              const containerClass =
                isUser
                  ? "flex gap-3 justify-end"
                  : "flex gap-3 justify-start";

              const bubbleClass =
                isUser
                  ? "max-w-[80%] rounded-2xl px-4 py-3 bg-blue-600 text-white"
                  : message.error
                    ? "max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border border-red-200 text-red-700"
                    : "max-w-[80%] rounded-2xl px-4 py-3 bg-white border text-gray-800";


              // ------------------------------------------------
              // VERY IMPORTANT:
              // ReactMarkdown receives ONLY a string.
              // ------------------------------------------------

              const safeContent =
                getMessageContent(
                  message.content
                );


              return (

                <div
                  key={index}
                  className={containerClass}
                >

                  {/* ------------------------------------------
                      AI ICON
                  ------------------------------------------ */}

                  {!isUser && (

                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

                      <FaRobot
                        className="text-blue-600"
                        size={18}
                      />

                    </div>

                  )}


                  {/* ------------------------------------------
                      MESSAGE BUBBLE
                  ------------------------------------------ */}

                  <div className={bubbleClass}>

                    {isUser ? (

                      <p className="whitespace-pre-wrap">
                        {safeContent}
                      </p>

                    ) : (

                      <div className="prose prose-sm max-w-none">

                        <ReactMarkdown
                          remarkPlugins={[
                            remarkGfm,
                          ]}
                        >
                          {safeContent}
                        </ReactMarkdown>

                      </div>

                    )}


                    {/* ----------------------------------------
                        COPY
                    ---------------------------------------- */}

                    {!isUser && (

                      <button
                        onClick={() =>
                          handleCopy(
                            safeContent
                          )
                        }
                        className="mt-3 text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                      >

                        <FaCopy />

                        Copy

                      </button>

                    )}

                  </div>


                  {/* ------------------------------------------
                      USER ICON
                  ------------------------------------------ */}

                  {isUser && (

                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">

                      <FaUser
                        size={16}
                      />

                    </div>

                  )}

                </div>

              );
            }
          )}


          {/* =================================================
              THINKING
          ================================================= */}

          {loading && (

            <div className="flex gap-3">

              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

                <FaRobot
                  className="text-blue-600"
                  size={18}
                />

              </div>

              <div className="bg-white border rounded-2xl px-4 py-3 text-gray-500">

                Thinking...

              </div>

            </div>

          )}


          <div ref={messagesEndRef} />

        </div>

      </div>


      {/* ==================================================
          INPUT
      ================================================== */}

      <div className="mt-4">

        <textarea
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask a question about this document..."
          rows={3}
          className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />


        <div className="flex justify-between items-center mt-2">

          <p className="text-xs text-gray-400">
            Enter to send - Shift + Enter for new line
          </p>


          <button
            onClick={sendMessage}
            disabled={
              loading ||
              !input.trim()
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
          >

            {loading
              ? "Thinking..."
              : "Ask AI"}

          </button>

        </div>

      </div>

    </div>
  );
}


export default DocumentChat;
import { useEffect, useRef, useState } from "react";

import {
  FaRobot,
  FaUser,
  FaCopy,
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import toast from "react-hot-toast";

import {
  chatWithAI,
  getGeneralChatHistory,
} from "../services/api";

import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";


function GeneralChat() {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  useEffect(() => {
    const loadHistory = async () => {
      if (!user) {
        setMessages([]);
        return;
      }

      try {
        const res = await getGeneralChatHistory();

        const chats = res.data?.chats || [];

        const formatted = [];

        chats.forEach((chat) => {
          formatted.push({
            role: "user",
            content: chat.question,
          });

          formatted.push({
            role: "assistant",
            content: chat.answer,
          });
        });

        setMessages(formatted);

      } catch (err) {
        console.error(
          "General chat history error:",
          err
        );
      }
    };

    loadHistory();
  }, [user]);


  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Answer copied");

    } catch (err) {
      console.error(err);

      toast.error("Failed to copy answer");
    }
  };


  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    if (!user) {
      setShowLogin(true);
      return;
    }

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      setLoading(true);

      const res = await chatWithAI(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            res.data?.answer ||
            "I couldn't generate an answer.",
        },
      ]);

    } catch (err) {
      console.error(
        "General AI error:",
        err
      );

      const errorMessage =
        err.response?.data?.detail ||
        "Unable to get an answer.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          error: true,
        },
      ]);

    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };


  return (
    <>
      <div className="bg-white rounded-2xl border shadow-sm p-6 min-h-[560px] flex flex-col">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">

            <FaRobot
              className="text-green-600"
              size={22}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              General Legal AI
            </h2>

            <p className="text-sm text-gray-500">
              Ask general legal questions.
            </p>

          </div>

        </div>


        <div className="flex-1 bg-green-50/40 border rounded-xl p-4 min-h-[350px] max-h-[400px] overflow-y-auto">

          {messages.length === 0 && (
            <div className="h-full min-h-[300px] flex items-center justify-center text-center">

              <div>

                <FaRobot
                  className="mx-auto text-green-500"
                  size={40}
                />

                <h3 className="font-semibold text-gray-700 mt-4">
                  General Legal Assistant
                </h3>

                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                  Ask about legal concepts,
                  procedures, rights, or
                  general legal information.
                </p>

              </div>

            </div>
          )}


          <div className="space-y-4">

            {messages.map((message, index) => (

              <div
                key={index}
                className={
                  "flex gap-3 " +
                  (
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  )
                }
              >

                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">

                    <FaRobot
                      className="text-green-600"
                      size={16}
                    />

                  </div>
                )}


                <div
                  className={
                    "max-w-[82%] rounded-2xl px-4 py-3 " +
                    (
                      message.role === "user"
                        ? "bg-green-600 text-white"
                        : message.error
                          ? "bg-red-50 border border-red-200 text-red-700"
                          : "bg-white border text-gray-800"
                    )
                  }
                >

                  {message.role === "assistant" ? (

                    <div className="prose prose-sm max-w-none">

                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown>

                    </div>

                  ) : (

                    <p className="whitespace-pre-wrap">
                      {message.content}
                    </p>

                  )}


                  {message.role === "assistant" && (

                    <button
                      onClick={() =>
                        handleCopy(message.content)
                      }
                      className="mt-2 text-xs text-gray-500 hover:text-green-600 flex items-center gap-1"
                    >

                      <FaCopy />
                      Copy

                    </button>

                  )}

                </div>


                {message.role === "user" && (

                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">

                    <FaUser size={14} />

                  </div>

                )}

              </div>

            ))}


            {loading && (

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

                  <FaRobot
                    className="text-green-600"
                    size={16}
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


        <div className="mt-4">

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask a general legal question..."
            rows={3}
            className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
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
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {loading
                ? "Thinking..."
                : "Ask AI"}
            </button>

          </div>

        </div>

      </div>


      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />

    </>
  );
}


export default GeneralChat;

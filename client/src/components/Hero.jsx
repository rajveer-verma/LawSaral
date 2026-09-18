import { 
  FaBalanceScale, 
  FaRobot, 
  FaSearch, 
  FaShieldAlt, 
  FaExclamationTriangle, 
} from "react-icons/fa"; 
 
function Hero() { 
  return ( 
    <section className="bg-white border-b border-gray-100"> 
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16"> 
 
        {/* Main Content */} 
        <div className="max-w-4xl mx-auto text-center"> 
 
          {/* Badge */} 
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-semibold">
         <FaBalanceScale size={14} />
         AI Powered Legal Document Analyzer
          </div>
          
          {/* Heading */} 
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-gray-900 leading-tight"> 
            Understand Legal Documents 
            <span className="block text-blue-600"> 
              in Simple Language 
            </span> 
          </h1> 
 
          {/* Description */} 
          <p className="mt-5 text-base sm:text-lg text-gray-500 leading-8 max-w-3xl mx-auto"> 
            Upload your legal documents, get AI-powered summaries, 
            identify potential areas that may require review, and 
            ask questions using document-specific AI. 
          </p> 
 
          {/* Feature Badges */} 
          <div className="flex flex-wrap justify-center gap-3 mt-8"> 
 
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700"> 
              <FaRobot className="text-blue-600" /> 
              Gemini AI 
            </div> 
 
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700"> 
              <FaSearch className="text-blue-600" /> 
              RAG 
            </div> 
 
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700"> 
              <FaExclamationTriangle className="text-red-500" /> 
              Risk Analysis 
            </div> 
 
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700"> 
              <FaRobot className="text-blue-600" /> 
              Agentic AI 
            </div> 
 
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700"> 
              <FaShieldAlt className="text-green-600" /> 
              Secure 
            </div> 
 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
} 
 
export default Hero;
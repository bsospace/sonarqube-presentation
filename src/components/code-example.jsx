import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const CodeExample = ({ code, language, description, title }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-red-500 rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between p-5">
          <div className="flex items-center space-x-3">
            {/* Language Badge */}
            <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
              {language}
            </span>
            {/* Title */}
            {title && (
              <h3 className="text-xl font-semibold text-gray-700">
                {title}
              </h3>
            )}
          </div>
          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group relative"
              aria-label="Copy code"
            >
              {isCopied ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : (
                <Copy className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
              )}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {isCopied ? 'Copied!' : 'Copy code'}
              </span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[4000px]' : 'max-h-0 overflow-hidden'}`}>
        <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-gray-200">
          {/* Code Section */}
          <div className="bg-gray-900 p-6 xl:p-8">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                fontSize: '1.1rem', // ขนาดตัวอักษรปรับเพิ่มเล็กน้อย
                lineHeight: '1.8', // เพิ่มระยะห่างบรรทัดเพื่อให้อ่านง่ายขึ้น
                borderRadius: '8px',
                margin: 0,
                padding: '1rem',
                background: 'transparent',
              }}
              className="!bg-transparent"
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>

          {/* Description Section */}
          <div className="p-6 xl:p-8 bg-gradient-to-br from-white to-pink-50">
            <div className="prose prose-pink max-w-none">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">คำอธิบาย</h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExample;

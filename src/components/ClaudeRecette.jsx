import React from "react";
import ReactMarkdown from "react-markdown";

const ClaudeRecette = ({ content }) => {
  if (!content) return null;

  return (
    <section className="my-8 px-4">
      <h2 className="text-xl font-bold mb-6 text-center">
        👨‍🍳 Chef Claude recommande :
      </h2>
      <article
        className="bg-gray-100 rounded-xl p-6 shadow-md prose prose-sm sm:prose-base max-w-none"
        aria-live="polite"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </section>
  );
};

export default ClaudeRecette;

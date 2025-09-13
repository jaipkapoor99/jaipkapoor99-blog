import React from "react";
import { Link } from "react-router-dom";

const DisclaimerPage: React.FC = () => (
  <div className="mx-auto p-4 max-w-3xl">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Disclaimer</h1>
    <p className="text-gray-700 mb-3">
      Some posts or sections may be drafted or edited with the help of AI tools.
      Every piece is reviewed, curated, and published by a human. Facts,
      opinions, and references represent my perspective unless noted otherwise.
    </p>
    <p className="text-gray-700 mb-3">
      Accuracy matters: I aim to verify details and cite sources where relevant.
      If you spot an error, please{" "}
      <Link
        to="/contact"
        className="text-pink-primary underline hover:no-underline"
      >
        contact me
      </Link>
      .
    </p>
    <p className="text-gray-700">
      Privacy note: No private or sensitive personal data is provided to AI
      services when producing content for this site.
    </p>
  </div>
);

export default DisclaimerPage;
